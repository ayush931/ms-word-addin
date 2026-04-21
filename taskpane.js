const LANGUAGE_TOOL_ENDPOINT = "https://api.languagetool.org/v2/check";
const PROGRESSIVE_RENDER_CHUNK_SIZE = 50;
const SCAN_BATCH_SIZE = PROGRESSIVE_RENDER_CHUNK_SIZE;
const SUGGESTIONS_PAGE_SIZE = 50;
const LANGUAGE_TOOL_CONCURRENCY = 4;
const LOCAL_SCAN_CONCURRENCY = Math.max(1, Math.min(8, Math.floor((window.navigator?.hardwareConcurrency || 4) / 2)));

const state = {
  suggestions: [],
  activeFilter: "all",
  currentPage: 1,
  scanning: false,
  scanProgress: null,
  latestSuggestionId: null,
};

const els = {};
let fallbackId = 0;

Office.onReady(() => {
  bindElements();
  bindEvents();
  render();
  setStatus("Opening document and scanning...");
  void scanDocument();
});

function bindElements() {
  els.scanButton = document.getElementById("scanButton");
  els.statusText = document.getElementById("statusText");
  els.scoreValue = document.getElementById("scoreValue");
  els.scoreLabel = document.getElementById("scoreLabel");
  els.scanProgress = document.getElementById("scanProgress");
  els.scanProgressText = document.getElementById("scanProgressText");
  els.scanProgressPercent = document.getElementById("scanProgressPercent");
  els.scanProgressBar = document.getElementById("scanProgressBar");
  els.pagination = document.getElementById("pagination");
  els.prevPageButton = document.getElementById("prevPageButton");
  els.nextPageButton = document.getElementById("nextPageButton");
  els.pageInfo = document.getElementById("pageInfo");
  els.suggestionList = document.getElementById("suggestionList");
  els.emptyState = document.getElementById("emptyState");
  els.onlineToggle = document.getElementById("onlineToggle");
  els.languageSelect = document.getElementById("languageSelect");
  els.acceptVisibleButton = document.getElementById("acceptVisibleButton");
  els.dismissVisibleButton = document.getElementById("dismissVisibleButton");
  els.tabs = Array.from(document.querySelectorAll(".tab"));
  els.counts = {
    all: document.getElementById("allCount"),
    spelling: document.getElementById("spellingCount"),
    grammar: document.getElementById("grammarCount"),
  };
}

function bindEvents() {
  els.scanButton.addEventListener("click", scanDocument);
  els.acceptVisibleButton.addEventListener("click", acceptVisibleSuggestions);
  els.dismissVisibleButton.addEventListener("click", dismissVisibleSuggestions);
  els.prevPageButton.addEventListener("click", () => {
    setPage(state.currentPage - 1);
  });
  els.nextPageButton.addEventListener("click", () => {
    setPage(state.currentPage + 1);
  });
  els.languageSelect.addEventListener("change", () => {
    if (state.suggestions.length) {
      setStatus("Language changed. Scan again to refresh suggestions.");
    }
  });
  els.tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      state.activeFilter = tab.dataset.filter;
      state.currentPage = 1;
      render();
    });
  });
}

async function scanDocument() {
  if (state.scanning) {
    return;
  }

  setScanning(true);
  state.scanProgress = null;
  setStatus("Reading document paragraphs...");

  try {
    await clearHighlightsForSuggestions(state.suggestions);
    state.suggestions = [];
    state.activeFilter = "all";
    state.currentPage = 1;
    state.latestSuggestionId = null;
    render();

    const paragraphs = await readParagraphs();
    const usableParagraphs = paragraphs.filter((paragraph) => paragraph.text.trim().length > 0);

    if (!usableParagraphs.length) {
      setStatus("No text found in this document.");
      return;
    }

    state.scanProgress = {
      current: 0,
      total: usableParagraphs.length,
    };
    render();

    setStatus(`Checking ${usableParagraphs.length} paragraph${usableParagraphs.length === 1 ? "" : "s"}...`);

    const suggestions = [];

    for (let start = 0; start < usableParagraphs.length; start += SCAN_BATCH_SIZE) {
      const batch = usableParagraphs.slice(start, start + SCAN_BATCH_SIZE);
      const batchSuggestions = [];

      await scanParagraphBatch(batch, async (paragraphSuggestions) => {
        state.scanProgress.current += 1;
        setStatus(`Checking paragraphs ${state.scanProgress.current} of ${state.scanProgress.total}...`);

        if (paragraphSuggestions.length) {
          batchSuggestions.push(...paragraphSuggestions);
          suggestions.push(...paragraphSuggestions);
          publishSuggestions(suggestions, paragraphSuggestions[paragraphSuggestions.length - 1].id);
        }
      });

      await yieldToBrowser();

      publishSuggestions(suggestions, getLastSuggestionId(batchSuggestions) || state.latestSuggestionId);
      await yieldToBrowser();

      if (batchSuggestions.length) {
        await highlightSuggestionsInDocument(batchSuggestions);
      }

      await yieldToBrowser();
    }

    setStatus(
      state.suggestions.length
        ? `${state.suggestions.length} suggestion${state.suggestions.length === 1 ? "" : "s"} found and highlighted.`
        : "No grammar or spelling suggestions found."
    );
  } catch (error) {
    console.error(error);
    setStatus(error.message || "Unable to scan this document.");
  } finally {
    state.scanProgress = null;
    setScanning(false);
    render();
  }
}

async function scanParagraphBatch(paragraphs, onParagraphScanned = null) {
  const concurrency = els.onlineToggle.checked ? LANGUAGE_TOOL_CONCURRENCY : LOCAL_SCAN_CONCURRENCY;

  return mapWithConcurrency(paragraphs, concurrency, async (paragraph) => {
    const local = runLocalChecks(paragraph);
    const remote = els.onlineToggle.checked ? await checkWithLanguageTool(paragraph) : [];
    const suggestions = mergeSuggestions(remote, local);

    if (onParagraphScanned) {
      await onParagraphScanned(suggestions, paragraph);
    }

    return suggestions;
  });
}

function publishSuggestions(suggestions, latestSuggestionId = null) {
  suggestions.sort((a, b) => {
    if (a.paragraphIndex !== b.paragraphIndex) {
      return a.paragraphIndex - b.paragraphIndex;
    }
    return a.offset - b.offset;
  });

  state.suggestions = suggestions.slice();
  if (latestSuggestionId) {
    state.latestSuggestionId = latestSuggestionId;
  }
  render();
}

function getLastSuggestionId(suggestions) {
  if (!suggestions.length) {
    return null;
  }

  return suggestions[suggestions.length - 1].id;
}

async function readParagraphs() {
  return Word.run(async (context) => {
    const paragraphs = context.document.body.paragraphs;
    paragraphs.load("items/text");
    await context.sync();

    return paragraphs.items.map((paragraph, index) => ({
      paragraphIndex: index,
      text: normalizeWordText(paragraph.text),
    }));
  });
}

async function checkWithLanguageTool(paragraph) {
  try {
    const body = new URLSearchParams({
      text: paragraph.text,
      language: els.languageSelect.value,
      enabledOnly: "false",
    });

    const response = await fetch(LANGUAGE_TOOL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    if (!response.ok) {
      throw new Error(`LanguageTool returned ${response.status}`);
    }

    const data = await response.json();
    return data.matches.map((match) => fromLanguageToolMatch(paragraph, match));
  } catch (error) {
    console.warn("LanguageTool check failed, local checks still ran.", error);
    return [];
  }
}

function fromLanguageToolMatch(paragraph, match) {
  const categoryId = match.rule?.category?.id || "";
  const issueType = match.rule?.issueType || "";
  const type = categoryId.includes("TYPOS") || issueType === "misspelling" ? "spelling" : "grammar";
  const replacement = match.replacements?.[0]?.value || "";

  return {
    id: createId(),
    paragraphIndex: paragraph.paragraphIndex,
    paragraphText: paragraph.text,
    offset: match.offset,
    length: match.length,
    type,
    message: match.message || "Review this text.",
    replacements: match.replacements?.slice(0, 4).map((item) => item.value).filter(Boolean) || [],
    selectedReplacement: replacement,
    source: "LanguageTool",
  };
}

function runLocalChecks(paragraph) {
  const checks = [
    ...findRegexIssues(paragraph, /\b(teh)\b/gi, "spelling", "Possible spelling mistake.", ["the"]),
    ...findRegexIssues(paragraph, /\b(recieve|recieved|recieving)\b/gi, "spelling", "Possible spelling mistake.", ["receive"]),
    ...findRegexIssues(paragraph, /\b(seperate|seperated|seperately)\b/gi, "spelling", "Possible spelling mistake.", ["separate"]),
    ...findRegexIssues(paragraph, /\b(definately)\b/gi, "spelling", "Possible spelling mistake.", ["definitely"]),
    ...findRegexIssues(paragraph, /\b(alot)\b/gi, "spelling", "Possible spelling mistake.", ["a lot"]),
    ...findRegexIssues(paragraph, / {2,}/g, "grammar", "Use one space.", [" "]),
    ...findRegexIssues(paragraph, /\b(is|are|was|were)\s+\1\b/gi, "grammar", "Repeated verb.", ["$1"]),
    ...findRegexIssues(paragraph, /\b(\w+)\s+\1\b/gi, "grammar", "Repeated word.", ["$1"]),
    ...findRegexIssues(paragraph, /\b(i)\b/g, "grammar", "Capitalize the pronoun.", ["I"]),
    ...findRegexIssues(paragraph, /\s+([,.!?;:])/g, "grammar", "Remove the space before punctuation.", ["$1"]),
    ...findRegexIssues(paragraph, /([!?]){2,}/g, "grammar", "Use one punctuation mark.", ["$1"]),
    ...findRegexIssues(paragraph, /([,;:!?])(?=\S)/g, "grammar", "Add a space after punctuation.", ["$1 "]),
    ...findRegexIssues(paragraph, /([A-Za-z]{3,}\.)(?=[A-Z][a-z])/g, "grammar", "Add a space after the period.", ["$1 "]),
  ];

  return checks;
}

function findRegexIssues(paragraph, regex, type, message, replacements) {
  const issues = [];
  let match;

  while ((match = regex.exec(paragraph.text)) !== null) {
    const replacementValues = replacements.map((replacement) => replacement.replace("$1", match[1] || ""));
    issues.push({
      id: createId(),
      paragraphIndex: paragraph.paragraphIndex,
      paragraphText: paragraph.text,
      offset: match.index,
      length: match[0].length,
      type,
      message,
      replacements: replacementValues,
      selectedReplacement: replacementValues[0] || "",
      source: "Local",
    });
  }

  return issues;
}

function mergeSuggestions(remote, local) {
  const seen = new Set();
  return [...remote, ...local].filter((suggestion) => {
    const key = `${suggestion.paragraphIndex}:${suggestion.offset}:${suggestion.length}`;
    if (seen.has(key) || !suggestion.selectedReplacement) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

async function acceptSuggestion(id) {
  const suggestion = state.suggestions.find((item) => item.id === id);
  if (!suggestion || !suggestion.selectedReplacement) {
    return;
  }

  setStatus("Applying suggestion...");

  try {
    await replaceSuggestionText(suggestion);
    await dismissSuggestion(id);
    setStatus("Suggestion applied.");
  } catch (error) {
    console.error(error);
    setStatus(error.message || "Could not apply the suggestion.");
  }
}

async function replaceSuggestionText(suggestion) {
  const originalText = suggestion.paragraphText.slice(suggestion.offset, suggestion.offset + suggestion.length);
  const occurrenceIndex = countOccurrencesBefore(suggestion.paragraphText, originalText, suggestion.offset);

  await Word.run(async (context) => {
    const paragraphs = context.document.body.paragraphs;
    paragraphs.load("items");
    await context.sync();

    const paragraph = paragraphs.items[suggestion.paragraphIndex];
    if (!paragraph) {
      throw new Error("The paragraph changed. Scan again.");
    }

    const matches = paragraph.search(originalText, {
      matchCase: true,
      matchWholeWord: false,
    });
    matches.load("items");
    await context.sync();

    const target = matches.items[occurrenceIndex] || matches.items[0];
    if (!target) {
      throw new Error("The original text was not found. Scan again.");
    }

    target.font.highlightColor = null;
    target.insertText(suggestion.selectedReplacement, Word.InsertLocation.replace);
    await context.sync();
  });
}

async function highlightSuggestionsInDocument(suggestions) {
  await setSuggestionHighlights(suggestions, "Yellow");
}

async function clearHighlightsForSuggestions(suggestions) {
  await setSuggestionHighlights(suggestions, null);
}

async function setSuggestionHighlights(suggestions, highlightColor) {
  if (!suggestions.length) {
    return;
  }

  try {
    await Word.run(async (context) => {
      const paragraphs = context.document.body.paragraphs;
      paragraphs.load("items");
      await context.sync();

      const groupedSuggestions = groupSuggestionsByParagraph(suggestions);
      const pendingHighlights = [];

      for (const [paragraphIndex, paragraphSuggestions] of groupedSuggestions) {
        const paragraph = paragraphs.items[paragraphIndex];
        if (!paragraph) {
          continue;
        }

        const paragraphSearches = paragraphSuggestions
          .map((suggestion) => {
            const originalText = getOriginalText(suggestion);
            if (!originalText) {
              return null;
            }

            const matches = paragraph.search(originalText, {
              matchCase: true,
              matchWholeWord: false,
            });
            matches.load("items");

            return { suggestion, originalText, matches };
          })
          .filter(Boolean);

        for (const { suggestion, originalText, matches } of paragraphSearches) {
          pendingHighlights.push({ suggestion, originalText, matches });
        }
      }

      if (!pendingHighlights.length) {
        return;
      }

      await context.sync();

      for (const { suggestion, originalText, matches } of pendingHighlights) {
        const occurrenceIndex = countOccurrencesBefore(suggestion.paragraphText, originalText, suggestion.offset);
        const target = matches.items[occurrenceIndex] || matches.items[0];
        if (target) {
          target.font.highlightColor = highlightColor;
        }
      }

      await context.sync();
    });
  } catch (error) {
    console.warn("Could not update suggestion highlights.", error);
  }
}

function countOccurrencesBefore(text, searchText, offset) {
  if (!searchText) {
    return 0;
  }

  let count = 0;
  let index = text.indexOf(searchText);
  while (index !== -1 && index < offset) {
    count += 1;
    index = text.indexOf(searchText, index + searchText.length);
  }
  return count;
}

async function dismissSuggestion(id) {
  const suggestion = state.suggestions.find((item) => item.id === id);
  if (suggestion) {
    await clearHighlightsForSuggestions([suggestion]);
  }
  state.suggestions = state.suggestions.filter((suggestion) => suggestion.id !== id);
  render();
}

async function acceptVisibleSuggestions() {
  const visible = getVisibleSuggestions();
  if (!visible.length) {
    return;
  }

  setStatus(`Applying ${visible.length} suggestion${visible.length === 1 ? "" : "s"}...`);

  try {
    await replaceSuggestionsTextBatch(visible);
    const visibleIds = new Set(visible.map((suggestion) => suggestion.id));
    state.suggestions = state.suggestions.filter((suggestion) => !visibleIds.has(suggestion.id));
    if (state.latestSuggestionId && visibleIds.has(state.latestSuggestionId)) {
      state.latestSuggestionId = null;
    }
    setStatus(`${visible.length} suggestion${visible.length === 1 ? "" : "s"} applied.`);
    render();
  } catch (error) {
    console.error(error);
    setStatus(error.message || "Could not apply visible suggestions.");
  }
}

async function replaceSuggestionsTextBatch(suggestions) {
  const groupedSuggestions = groupSuggestionsByParagraph(
    suggestions
      .filter((suggestion) => suggestion.selectedReplacement)
      .sort((a, b) => {
        if (a.paragraphIndex !== b.paragraphIndex) {
          return a.paragraphIndex - b.paragraphIndex;
        }
        return b.offset - a.offset;
      })
  );

  await Word.run(async (context) => {
    const paragraphs = context.document.body.paragraphs;
    paragraphs.load("items");
    await context.sync();

    for (const [paragraphIndex, paragraphSuggestions] of groupedSuggestions) {
      const paragraph = paragraphs.items[paragraphIndex];
      if (!paragraph) {
        continue;
      }

      const pendingReplacements = [];
      for (const suggestion of paragraphSuggestions) {
        const originalText = getOriginalText(suggestion);
        if (!originalText) {
          continue;
        }

        const matches = paragraph.search(originalText, {
          matchCase: true,
          matchWholeWord: false,
        });
        matches.load("items");

        pendingReplacements.push({
          suggestion,
          matches,
          occurrenceIndex: countOccurrencesBefore(suggestion.paragraphText, originalText, suggestion.offset),
        });
      }

      if (!pendingReplacements.length) {
        continue;
      }

      await context.sync();

      for (const { suggestion, matches, occurrenceIndex } of pendingReplacements) {
        const target = matches.items[occurrenceIndex] || matches.items[0];
        if (!target) {
          continue;
        }

        target.font.highlightColor = null;
        target.insertText(suggestion.selectedReplacement, Word.InsertLocation.replace);
      }
    }

    await context.sync();
  });
}

async function dismissVisibleSuggestions() {
  const visible = getVisibleSuggestions();
  await clearHighlightsForSuggestions(visible);
  state.suggestions = state.suggestions.filter((suggestion) => !visible.some((item) => item.id === suggestion.id));
  setStatus(`${visible.length} suggestion${visible.length === 1 ? "" : "s"} dismissed.`);
  render();
}

function render() {
  const counts = getCounts();
  els.counts.all.textContent = counts.all;
  els.counts.spelling.textContent = counts.spelling;
  els.counts.grammar.textContent = counts.grammar;

  els.tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.filter === state.activeFilter);
  });

  const filtered = getFilteredSuggestions();
  const pageCount = getPageCount(filtered.length);
  state.currentPage = Math.max(1, Math.min(state.currentPage, pageCount));
  const visible = getVisibleSuggestions(filtered);

  els.acceptVisibleButton.disabled = visible.length === 0;
  els.dismissVisibleButton.disabled = visible.length === 0;

  renderScore(counts.all);
  renderPagination(filtered.length, visible.length, pageCount);
  renderSuggestions(visible);
}

function renderScore(total) {
  if (state.scanning) {
    els.scoreValue.textContent = "...";
    els.scoreLabel.textContent = "Scanning";
    renderScanProgress();
    return;
  }

  const score = Math.max(0, 100 - total * 7);
  els.scoreValue.textContent = state.suggestions.length ? score : "--";
  els.scoreLabel.textContent = total ? "Needs review" : "Ready";
  renderScanProgress();
}

function renderScanProgress() {
  if (!els.scanProgress) {
    return;
  }

  const progress = state.scanProgress;
  const visible = Boolean(progress && progress.total > 0 && state.scanning);
  els.scanProgress.classList.toggle("hidden", !visible);

  if (!visible) {
    return;
  }

  const percent = Math.min(100, Math.round((progress.current / progress.total) * 100));
  els.scanProgressText.textContent = `${progress.current} of ${progress.total} paragraphs scanned`;
  els.scanProgressPercent.textContent = `${percent}%`;
  els.scanProgressBar.style.width = `${percent}%`;
  els.scanProgressBar.setAttribute("aria-valuenow", String(percent));
}

function renderSuggestions(visible) {

  els.suggestionList.innerHTML = "";
  els.emptyState.classList.toggle("hidden", visible.length > 0);

  const fragment = document.createDocumentFragment();
  visible.forEach((suggestion) => {
    fragment.appendChild(createSuggestionCard(suggestion));
  });
  els.suggestionList.appendChild(fragment);

  revealLatestSuggestion();
}

function getFilteredSuggestions() {
  return state.suggestions.filter((suggestion) => {
    return state.activeFilter === "all" || suggestion.type === state.activeFilter;
  });
}

function getVisibleSuggestions(filteredSuggestions = getFilteredSuggestions()) {
  const start = (state.currentPage - 1) * SUGGESTIONS_PAGE_SIZE;
  return filteredSuggestions.slice(start, start + SUGGESTIONS_PAGE_SIZE);
}

function getPageCount(totalSuggestions) {
  return Math.max(1, Math.ceil(totalSuggestions / SUGGESTIONS_PAGE_SIZE));
}

function setPage(nextPage) {
  const pageCount = getPageCount(getFilteredSuggestions().length);
  const clampedPage = Math.max(1, Math.min(nextPage, pageCount));
  if (clampedPage === state.currentPage) {
    return;
  }

  state.currentPage = clampedPage;
  render();
}

function renderPagination(filteredCount, visibleCount, pageCount) {
  if (!els.pagination) {
    return;
  }

  const shouldShow = filteredCount > SUGGESTIONS_PAGE_SIZE;
  els.pagination.classList.toggle("hidden", !shouldShow);

  const pageStart = filteredCount ? (state.currentPage - 1) * SUGGESTIONS_PAGE_SIZE + 1 : 0;
  const pageEnd = filteredCount ? pageStart + visibleCount - 1 : 0;
  els.pageInfo.textContent = `Page ${state.currentPage}/${pageCount} • ${pageStart}-${pageEnd} of ${filteredCount}`;

  els.prevPageButton.disabled = state.currentPage <= 1;
  els.nextPageButton.disabled = state.currentPage >= pageCount;
}

function createSuggestionCard(suggestion) {
  const card = document.createElement("article");
  card.className = "suggestion-card";
  card.dataset.suggestionId = suggestion.id;
  card.classList.toggle("new", suggestion.id === state.latestSuggestionId);

  const meta = document.createElement("div");
  meta.className = "suggestion-meta";
  meta.innerHTML = `<span class="badge ${suggestion.type}">${capitalize(suggestion.type)}</span><span>Paragraph ${suggestion.paragraphIndex + 1}</span>`;

  const context = document.createElement("p");
  context.className = "context";
  context.append(...buildContextNodes(suggestion));

  const message = document.createElement("p");
  message.className = "message";
  message.textContent = suggestion.message;

  const replacementRow = document.createElement("div");
  replacementRow.className = "replacement-row";
  suggestion.replacements.slice(0, 4).forEach((replacement) => {
    const chip = document.createElement("button");
    chip.className = "replacement";
    chip.type = "button";
    chip.textContent = replacement;
    chip.addEventListener("click", () => {
      suggestion.selectedReplacement = replacement;
      acceptSuggestion(suggestion.id);
    });
    replacementRow.appendChild(chip);
  });

  const actions = document.createElement("div");
  actions.className = "actions";

  const accept = document.createElement("button");
  accept.className = "action accept";
  accept.type = "button";
  accept.textContent = "Accept";
  accept.addEventListener("click", () => acceptSuggestion(suggestion.id));

  const reject = document.createElement("button");
  reject.className = "action reject";
  reject.type = "button";
  reject.textContent = "Reject";
  reject.addEventListener("click", () => {
    void dismissSuggestion(suggestion.id);
  });

  actions.append(accept, reject);
  card.append(meta, context, message, replacementRow, actions);
  return card;
}

function revealLatestSuggestion() {
  if (!state.scanning || !state.latestSuggestionId) {
    return;
  }

  const card = els.suggestionList.querySelector(`[data-suggestion-id="${state.latestSuggestionId}"]`);
  if (card) {
    card.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
}

function buildContextNodes(suggestion) {
  const text = suggestion.paragraphText;
  const start = Math.max(0, suggestion.offset - 55);
  const end = Math.min(text.length, suggestion.offset + suggestion.length + 55);
  const before = text.slice(start, suggestion.offset);
  const wrong = text.slice(suggestion.offset, suggestion.offset + suggestion.length);
  const after = text.slice(suggestion.offset + suggestion.length, end);
  const nodes = [];

  if (start > 0) {
    nodes.push(document.createTextNode("..."));
  }
  nodes.push(document.createTextNode(before));

  const highlight = document.createElement("span");
  highlight.className = "highlight";
  highlight.textContent = wrong;
  nodes.push(highlight);

  nodes.push(document.createTextNode(after));
  if (end < text.length) {
    nodes.push(document.createTextNode("..."));
  }

  return nodes;
}

function getCounts() {
  return state.suggestions.reduce(
    (counts, suggestion) => {
      counts.all += 1;
      counts[suggestion.type] += 1;
      return counts;
    },
    { all: 0, spelling: 0, grammar: 0 }
  );
}

function setScanning(scanning) {
  state.scanning = scanning;
  els.scanButton.disabled = scanning;
  els.scanButton.setAttribute("aria-busy", String(scanning));
}

function setStatus(message) {
  els.statusText.textContent = message;
}

function normalizeWordText(text) {
  return text.replace(/\r/g, "");
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getOriginalText(suggestion) {
  return suggestion.paragraphText.slice(suggestion.offset, suggestion.offset + suggestion.length);
}

function createId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  fallbackId += 1;
  return `suggestion-${Date.now()}-${fallbackId}`;
}

async function yieldToBrowser() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

function mapWithConcurrency(items, concurrency, mapper) {
  const results = new Array(items.length);
  const activeWorkers = Math.max(1, Math.min(concurrency, items.length));
  let nextIndex = 0;

  const workers = Array.from({ length: activeWorkers }, async () => {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      results[currentIndex] = await mapper(items[currentIndex], currentIndex);
    }
  });

  return Promise.all(workers).then(() => results);
}

function groupSuggestionsByParagraph(suggestions) {
  const grouped = new Map();

  for (const suggestion of suggestions) {
    if (!grouped.has(suggestion.paragraphIndex)) {
      grouped.set(suggestion.paragraphIndex, []);
    }

    grouped.get(suggestion.paragraphIndex).push(suggestion);
  }

  return grouped;
}
