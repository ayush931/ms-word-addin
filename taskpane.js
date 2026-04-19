const LANGUAGE_TOOL_ENDPOINT = "https://api.languagetool.org/v2/check";

const state = {
  suggestions: [],
  activeFilter: "all",
  scanning: false,
};

const els = {};
let fallbackId = 0;

Office.onReady(() => {
  bindElements();
  bindEvents();
  render();
});

function bindElements() {
  els.scanButton = document.getElementById("scanButton");
  els.statusText = document.getElementById("statusText");
  els.scoreValue = document.getElementById("scoreValue");
  els.scoreLabel = document.getElementById("scoreLabel");
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
  els.languageSelect.addEventListener("change", () => {
    if (state.suggestions.length) {
      setStatus("Language changed. Scan again to refresh suggestions.");
    }
  });
  els.tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      state.activeFilter = tab.dataset.filter;
      render();
    });
  });
}

async function scanDocument() {
  if (state.scanning) {
    return;
  }

  setScanning(true);
  setStatus("Reading document paragraphs...");

  try {
    await clearHighlightsForSuggestions(state.suggestions);
    const paragraphs = await readParagraphs();
    const usableParagraphs = paragraphs.filter((paragraph) => paragraph.text.trim().length > 0);

    if (!usableParagraphs.length) {
      state.suggestions = [];
      setStatus("No text found in this document.");
      return;
    }

    setStatus(`Checking ${usableParagraphs.length} paragraph${usableParagraphs.length === 1 ? "" : "s"}...`);

    const batches = await Promise.all(
      usableParagraphs.map(async (paragraph) => {
        const remote = els.onlineToggle.checked ? await checkWithLanguageTool(paragraph) : [];
        const local = runLocalChecks(paragraph);
        return mergeSuggestions(remote, local);
      })
    );

    state.suggestions = batches.flat().sort((a, b) => {
      if (a.paragraphIndex !== b.paragraphIndex) {
        return a.paragraphIndex - b.paragraphIndex;
      }
      return a.offset - b.offset;
    });

    await highlightSuggestionsInDocument(state.suggestions);

    setStatus(
      state.suggestions.length
        ? `${state.suggestions.length} suggestion${state.suggestions.length === 1 ? "" : "s"} found and highlighted.`
        : "No grammar or spelling suggestions found."
    );
  } catch (error) {
    console.error(error);
    setStatus(error.message || "Unable to scan this document.");
  } finally {
    setScanning(false);
    render();
  }
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
    dismissSuggestion(id);
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
  if (!suggestions.length) {
    return;
  }

  try {
    await Word.run(async (context) => {
      const paragraphs = context.document.body.paragraphs;
      paragraphs.load("items");
      await context.sync();

      for (const suggestion of suggestions) {
        const paragraph = paragraphs.items[suggestion.paragraphIndex];
        const originalText = getOriginalText(suggestion);
        if (!paragraph || !originalText) {
          continue;
        }

        const matches = paragraph.search(originalText, {
          matchCase: true,
          matchWholeWord: false,
        });
        matches.load("items");
        await context.sync();

        const occurrenceIndex = countOccurrencesBefore(suggestion.paragraphText, originalText, suggestion.offset);
        const target = matches.items[occurrenceIndex] || matches.items[0];
        if (target) {
          target.font.highlightColor = "Yellow";
        }
      }

      await context.sync();
    });
  } catch (error) {
    console.warn("Could not highlight suggestions in the document.", error);
  }
}

async function clearHighlightsForSuggestions(suggestions) {
  if (!suggestions.length) {
    return;
  }

  try {
    await Word.run(async (context) => {
      const paragraphs = context.document.body.paragraphs;
      paragraphs.load("items");
      await context.sync();

      for (const suggestion of suggestions) {
        const paragraph = paragraphs.items[suggestion.paragraphIndex];
        const originalText = getOriginalText(suggestion);
        if (!paragraph || !originalText) {
          continue;
        }

        const matches = paragraph.search(originalText, {
          matchCase: true,
          matchWholeWord: false,
        });
        matches.load("items");
        await context.sync();

        const occurrenceIndex = countOccurrencesBefore(suggestion.paragraphText, originalText, suggestion.offset);
        const target = matches.items[occurrenceIndex] || matches.items[0];
        if (target) {
          target.font.highlightColor = null;
        }
      }

      await context.sync();
    });
  } catch (error) {
    console.warn("Could not clear suggestion highlights.", error);
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

function dismissSuggestion(id) {
  const suggestion = state.suggestions.find((item) => item.id === id);
  if (suggestion) {
    clearHighlightsForSuggestions([suggestion]);
  }
  state.suggestions = state.suggestions.filter((suggestion) => suggestion.id !== id);
  render();
}

async function acceptVisibleSuggestions() {
  const visible = getVisibleSuggestions();
  for (const suggestion of visible) {
    await acceptSuggestion(suggestion.id);
  }
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

  const visible = getVisibleSuggestions();
  els.acceptVisibleButton.disabled = state.scanning || visible.length === 0;
  els.dismissVisibleButton.disabled = state.scanning || visible.length === 0;

  renderScore(counts.all);
  renderSuggestions();
}

function renderScore(total) {
  if (state.scanning) {
    els.scoreValue.textContent = "...";
    els.scoreLabel.textContent = "Scanning";
    return;
  }

  const score = Math.max(0, 100 - total * 7);
  els.scoreValue.textContent = state.suggestions.length ? score : "--";
  els.scoreLabel.textContent = total ? "Needs review" : "Ready";
}

function renderSuggestions() {
  const visible = getVisibleSuggestions();

  els.suggestionList.innerHTML = "";
  els.emptyState.classList.toggle("hidden", visible.length > 0);

  const fragment = document.createDocumentFragment();
  visible.forEach((suggestion) => {
    fragment.appendChild(createSuggestionCard(suggestion));
  });
  els.suggestionList.appendChild(fragment);
}

function getVisibleSuggestions() {
  return state.suggestions.filter((suggestion) => {
    return state.activeFilter === "all" || suggestion.type === state.activeFilter;
  });
}

function createSuggestionCard(suggestion) {
  const card = document.createElement("article");
  card.className = "suggestion-card";

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
  reject.addEventListener("click", () => dismissSuggestion(suggestion.id));

  actions.append(accept, reject);
  card.append(meta, context, message, replacementRow, actions);
  return card;
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
