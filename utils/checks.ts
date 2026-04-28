import { Suggestion, SuggestionType } from "../types/suggestion";

/**
 * utils/checks.ts
 *
 * Provides core copyediting logic for the Word Add-in.
 * Organized into:
 * 1. Local Checks (Quick, per-paragraph)
 * 2. Document Style Checks (Global consistency)
 * 3. Utility Helpers
 */

export type ParagraphLike = { text: string; paragraphIndex: number };

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const RANGE_WORDS = new Set([...MONTHS, ...DAYS]);

const KNOWN_ABBREVIATIONS = new Set([
  "AI", "API", "CPU", "CSS", "DNA", "DOI", "GPU", "HTML", "HTTP", "HTTPS",
  "MRI", "NASA", "NLP", "PDF", "RNA", "URL", "XML", "JSON", "UI",
]);

const MONTH_ALIASES: Record<string, string> = {
  jan: "January",
  january: "January",
  feb: "February",
  february: "February",
  mar: "March",
  march: "March",
  apr: "April",
  april: "April",
  may: "May",
  jun: "June",
  june: "June",
  jul: "July",
  july: "July",
  aug: "August",
  august: "August",
  sep: "September",
  sept: "September",
  september: "September",
  oct: "October",
  october: "October",
  nov: "November",
  november: "November",
  dec: "December",
  december: "December",
};

const MONTH_PATTERN = Object.keys(MONTH_ALIASES).sort((a, b) => b.length - a.length).join("|");
const OXFORD_IZE_SUFFIX_PATTERN = [
  "isations", "isation",
  "ysing", "ysed", "yses", "yse",
  "(?:al|ar|as|at|ct|er|gn|ic|il|in|it|iv|or)ising",
  "(?:al|ar|as|at|ct|er|gn|ic|il|in|it|iv|or)ised",
  "(?:al|ar|as|at|ct|er|gn|ic|il|in|it|iv|or)ises",
  "(?:al|ar|as|at|ct|er|gn|ic|il|in|it|iv|or)ise",
].join("|");

// --- Main Entry Points ---

/**
 * Quick checks for common typos and spacing errors.
 */
export function runLocalChecks(paragraph: ParagraphLike): Suggestion[] {
  return [
    ...findRegexIssues(paragraph, /\b(teh)\b/gi, "spelling", "Possible spelling mistake.", ["the"], "local-typo"),
    ...findRegexIssues(paragraph, /\b(recieve|recieved|recieving)\b/gi, "spelling", "Possible spelling mistake.", ["receive"], "local-typo"),
    ...findRegexIssues(paragraph, /\b(seperate|seperated|seperately)\b/gi, "spelling", "Possible spelling mistake.", ["separate"], "local-typo"),
    ...findRegexIssues(paragraph, /\b(definately)\b/gi, "spelling", "Possible spelling mistake.", ["definitely"], "local-typo"),
    ...findRegexIssues(paragraph, /\b(alot)\b/gi, "spelling", "Possible spelling mistake.", ["a lot"], "local-typo"),
    ...findRegexIssues(paragraph, / {2,}/g, "grammar", "Use one space.", [" "], "local-one-space"),
    ...findRegexIssues(paragraph, /\b(\w+)\s+\1\b/gi, "grammar", "Repeated word.", ["$1"], "local-repeated-word"),
    ...findRegexIssues(paragraph, /\b(i)\b/g, "grammar", "Capitalize the pronoun.", ["I"], "local-pronoun-i"),
    ...findRegexIssues(paragraph, /\s+([,.!?;:])/g, "grammar", "Remove the space before punctuation.", ["$1"], "local-space-before-punctuation"),
    ...findRegexIssues(paragraph, /([!?]){2,}/g, "grammar", "Use one punctuation mark.", ["$1"], "local-repeated-punctuation"),
    ...findRegexIssues(paragraph, /([,;:!?])(?=\S)/g, "grammar", "Add a space after punctuation.", ["$1 "], "local-space-after-punctuation"),
    ...findRegexIssues(paragraph, /([A-Za-z]{3,}\.)(?=[A-Z][a-z])/g, "grammar", "Add a space after the period.", ["$1 "], "local-space-after-period"),
  ];
}

/**
 * Comprehensive checks for consistency and professional styling.
 */
export function runDocumentStyleChecks(paragraphs: ParagraphLike[], language = "en-GB"): Suggestion[] {
  return [
    ...findTfUkIzeSpellingIssues(paragraphs),
    ...findDashConsistencyIssues(paragraphs),
    ...findQuotationIssues(paragraphs, "uk"),
    ...findQuotePunctuationIssues(paragraphs),
    ...findApostropheIssues(paragraphs),
    ...findHeadingIssues(paragraphs),
    ...findUkDateStyleIssues(paragraphs),
    ...findAbbreviationIssues(paragraphs),
    ...findSerialCommaIssues(paragraphs),
    ...findTableFigureNumberingIssues(paragraphs),
    ...findOperatorSpacingIssues(paragraphs),
  ];
}

// --- Check Implementations ---

function findTfUkIzeSpellingIssues(paragraphs: ParagraphLike[]): Suggestion[] {
  const issues: Suggestion[] = [];
  for (const p of paragraphs) {
    if (isSkippedParagraph(p.text)) continue;

    const iseSuffixRegex = new RegExp(`\\b[A-Za-z]{3,}(?:${OXFORD_IZE_SUFFIX_PATTERN})\\b`, "gi");
    let match: RegExpExecArray | null;
    while ((match = iseSuffixRegex.exec(p.text)) !== null) {
      if (overlapsProtected(p.text, match.index, match.index + match[0].length)) continue;

      const replacement = preserveCase(match[0], toOxfordIzeSpelling(match[0]));
      if (replacement === match[0]) continue;

      issues.push(createStyleSuggestion(
        p,
        match.index,
        match[0].length,
        "tf-uk-ize-spelling",
        "Follow UK -ize spelling style.",
        [replacement]
      ));
    }
  }
  return issues;
}

function findDashConsistencyIssues(paragraphs: ParagraphLike[]): Suggestion[] {
  const issues: Suggestion[] = [];
  for (const p of paragraphs) {
    if (isSkippedParagraph(p.text)) continue;

    const rangeRegex = /\b([A-Za-z]+|\d{1,4})(-)([A-Za-z]+|\d{1,4})\b/g;
    let match: RegExpExecArray | null;
    while ((match = rangeRegex.exec(p.text)) !== null) {
      const [original, left, , right] = match;
      const isRange = RANGE_WORDS.has(left) && RANGE_WORDS.has(right);
      const isNumeric = /^\d/.test(left) && /^\d/.test(right);
      const isProperNounPair = /^[A-Z]/.test(left) && /^[A-Z]/.test(right);

      if ((isRange || isNumeric || isProperNounPair) && !overlapsProtected(p.text, match.index, match.index + original.length)) {
        issues.push(createStyleSuggestion(p, match.index, original.length, "en-dash-range", "Use an en dash for ranges or related terms.", [`${left}\u2013${right}`]));
      }
    }

    const spacedEmDash = /\s+\u2014\s+/g;
    while ((match = spacedEmDash.exec(p.text)) !== null) {
      issues.push(createStyleSuggestion(p, match.index, match[0].length, "em-dash-spacing", "Em dashes should be unspaced.", ["\u2014"]));
    }

    const doubleHyphen = /([A-Za-z])--([A-Za-z])/g;
    while ((match = doubleHyphen.exec(p.text)) !== null) {
      issues.push(createStyleSuggestion(p, match.index, match[0].length, "em-dash-substitution", "Use an em dash instead of double hyphens.", [`${match[1]}\u2014${match[2]}`]));
    }
  }
  return issues;
}

function findQuotationIssues(paragraphs: ParagraphLike[], variant: "us" | "uk"): Suggestion[] {
  const issues: Suggestion[] = [];
  for (const p of paragraphs) {
    if (isSkippedParagraph(p.text)) continue;

    const doubleRegex = /"([^"\n]+)"/g;
    let match: RegExpExecArray | null;
    while ((match = doubleRegex.exec(p.text)) !== null) {
      if (overlapsProtected(p.text, match.index, match.index + match[0].length)) continue;
      issues.push(createStyleSuggestion(p, match.index, match[0].length, "quotation-style", variant === "us" ? "Use curly double quotes for primary quotes." : "Use curly double quotes for nested quotes.", [`\u201c${match[1]}\u201d`]));
    }

    const singleRegex = /(?<!\w)'([^'\n]+)'(?!\w)/g;
    while ((match = singleRegex.exec(p.text)) !== null) {
      if (overlapsProtected(p.text, match.index, match.index + match[0].length)) continue;
      issues.push(createStyleSuggestion(p, match.index, match[0].length, "quotation-style", variant === "uk" ? "Use curly single quotes for primary quotes." : "Use curly single quotes for nested quotes.", [`\u2018${match[1]}\u2019`]));
    }
  }
  return issues;
}

function findQuotePunctuationIssues(paragraphs: ParagraphLike[]): Suggestion[] {
  const issues: Suggestion[] = [];
  for (const p of paragraphs) {
    if (isSkippedParagraph(p.text)) continue;

    const regex = /([.,;:!?])(["'\u201d\u2019])/g;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(p.text)) !== null) {
      if (overlapsProtected(p.text, match.index, match.index + match[0].length)) continue;
      issues.push(createStyleSuggestion(
        p,
        match.index,
        match[0].length,
        "tf-quote-punctuation",
        "Place punctuation outside quotation marks unless it belongs to the quoted material.",
        [`${match[2]}${match[1]}`]
      ));
    }
  }
  return issues;
}

function findApostropheIssues(paragraphs: ParagraphLike[]): Suggestion[] {
  const issues: Suggestion[] = [];
  for (const p of paragraphs) {
    if (isSkippedParagraph(p.text)) continue;
    const regex = /\b[A-Za-z]+'[A-Za-z]+\b|'\d{2}s\b/g;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(p.text)) !== null) {
      if (overlapsProtected(p.text, match.index, match.index + match[0].length)) continue;
      issues.push(createStyleSuggestion(p, match.index, match[0].length, "smart-apostrophe", "Use a curly typographic apostrophe.", [match[0].replace(/'/g, "\u2019")]));
    }
  }
  return issues;
}

function findHeadingIssues(paragraphs: ParagraphLike[]): Suggestion[] {
  const issues: Suggestion[] = [];
  const headings = paragraphs.filter(p => isLikelyHeading(p.text));

  let score = 0;
  headings.forEach(h => {
    const words = h.text.trim().split(/\s+/);
    const caps = words.filter(w => /^[A-Z]/.test(w)).length;
    score += caps > words.length / 2 ? 1 : -1;
  });
  const dominant = score >= 0 ? "title" : "sentence";

  for (const p of paragraphs) {
    const text = p.text.trim();
    if (!text) continue;

    if (p.paragraphIndex < 3 && text.length > 65 && !isLikelyHeading(text)) {
      issues.push(createStyleSuggestion(p, p.text.indexOf(text), text.length, "running-head-length", "Running head exceeds 65 characters.", [], false));
    }

    if (isLikelyHeading(text)) {
      if (wordCount(text) > 60) {
        issues.push(createStyleSuggestion(p, p.text.indexOf(text), text.length, "heading-length", "Heading exceeds 60 words.", [], false));
      }

      const isTitle = text.split(/\s+/).filter(w => /^[A-Z]/.test(w)).length > wordCount(text) / 2;
      if (dominant === "title" && !isTitle) {
        issues.push(createStyleSuggestion(p, p.text.indexOf(text), text.length, "heading-casing", "Follow Title Case style.", [toTitleCase(text)], false));
      } else if (dominant === "sentence" && isTitle) {
        issues.push(createStyleSuggestion(p, p.text.indexOf(text), text.length, "heading-casing", "Follow Sentence case style.", [toSentenceCase(text)], false));
      }
    }

    if (/^abstract:?$/i.test(text)) {
      const count = wordCount(getBlockAfterHeading(p.paragraphIndex, paragraphs));
      if (count < 150 || count > 200) {
        issues.push(createStyleSuggestion(p, 0, p.text.length, "abstract-word-count", `Abstract is ${count} words (Target: 150-200).`, [], false));
      }
    }
  }
  return issues;
}

function findUkDateStyleIssues(paragraphs: ParagraphLike[]): Suggestion[] {
  const issues: Suggestion[] = [];
  for (const p of paragraphs) {
    if (isSkippedParagraph(p.text)) continue;

    collectDateIssues(p).forEach(issue => issues.push(issue));
  }
  return issues;
}

function findAbbreviationIssues(paragraphs: ParagraphLike[]): Suggestion[] {
  const issues: Suggestion[] = [];
  const defined = new Set<string>();

  for (const p of paragraphs) {
    if (isSkippedParagraph(p.text)) continue;

    const defRegex = /\b([A-Z][A-Za-z]+(?:\s+[A-Z][A-Za-z]+)+)\s*\(([A-Za-z]{2,})\)/g;
    let match: RegExpExecArray | null;
    while ((match = defRegex.exec(p.text)) !== null) {
      const abbr = match[2].toUpperCase();
      defined.add(abbr);
      if (!match[0].includes(" (")) {
        issues.push(createStyleSuggestion(p, match.index, match[0].length, "abbr-spacing", "Space before parentheses.", [`${match[1]} (${match[2]})`]));
      }
    }

    const abbrRegex = /\b[A-Z]{2,}\b/g;
    while ((match = abbrRegex.exec(p.text)) !== null) {
      if (KNOWN_ABBREVIATIONS.has(match[0]) && !defined.has(match[0])) {
        issues.push(createStyleSuggestion(p, match.index, match[0].length, "abbr-first-use", `Define "${match[0]}" on first use.`, [], false));
        defined.add(match[0]);
      }
    }
  }
  return issues;
}

function findSerialCommaIssues(paragraphs: ParagraphLike[]): Suggestion[] {
  const issues: Suggestion[] = [];
  for (const p of paragraphs) {
    if (isSkippedParagraph(p.text)) continue;
    const regex = /(\b[A-Za-z][\w'-]*\b),\s+(\b[A-Za-z][\w'-]*\b)\s+(and|or)\s+(\b[A-Za-z][\w'-]*\b)/g;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(p.text)) !== null) {
      issues.push(createStyleSuggestion(
        p,
        match.index,
        match[0].length,
        "tf-serial-comma",
        "Add the serial comma wherever needed for list clarity.",
        [`${match[1]}, ${match[2]}, ${match[3]} ${match[4]}`]
      ));
    }
  }
  return issues;
}

function findTableFigureNumberingIssues(paragraphs: ParagraphLike[]): Suggestion[] {
  const issues: Suggestion[] = [];
  let tCount = 1, fCount = 1;
  for (const p of paragraphs) {
    const text = p.text.trim();
    const tMatch = /^table\s+(\d+)/i.exec(text);
    if (tMatch && parseInt(tMatch[1]) !== tCount) {
      issues.push(createStyleSuggestion(p, p.text.toLowerCase().indexOf("table"), tMatch[0].length, "seq", `Expected Table ${tCount}.`, [`Table ${tCount}`]));
    }
    if (tMatch) tCount++;

    const fMatch = /^(figure|fig\.)\s+(\d+)/i.exec(text);
    if (fMatch && parseInt(fMatch[2]) !== fCount) {
      issues.push(createStyleSuggestion(p, p.text.toLowerCase().indexOf(fMatch[1].toLowerCase()), fMatch[0].length, "seq", `Expected ${fMatch[1]} ${fCount}.`, [`${fMatch[1]} ${fCount}`]));
    }
    if (fMatch) fCount++;
  }
  return issues;
}

function findOperatorSpacingIssues(paragraphs: ParagraphLike[]): Suggestion[] {
  const issues: Suggestion[] = [];
  for (const p of paragraphs) {
    if (isSkippedParagraph(p.text)) continue;
    const regex = /\b[\w.]+(?:\s*[-+*/=]\s*[\w.]+)+\b/g;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(p.text)) !== null) {
      if (!/[+*/=]/.test(match[0]) || overlapsProtected(p.text, match.index, match.index + match[0].length)) continue;
      const fix = match[0].replace(/\s*([-+*/=])\s*/g, " $1 ").replace(/\s{2,}/g, " ");
      if (fix !== match[0]) {
        issues.push(createStyleSuggestion(p, match.index, match[0].length, "math-space", "Add space around operators.", [fix]));
      }
    }
  }
  return issues;
}

// --- Helpers ---

function findRegexIssues(p: ParagraphLike, regex: RegExp, type: SuggestionType, message: string, replacements: string[], ruleId?: string): Suggestion[] {
  const issues: Suggestion[] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(p.text)) !== null) {
    const fixed = replacements.map(r => r.replace("$1", match![1] || ""));
    issues.push({
      id: Math.random().toString(36).substring(2, 11),
      paragraphIndex: p.paragraphIndex,
      paragraphText: p.text,
      offset: match.index,
      length: match[0].length,
      type,
      ruleId,
      message,
      replacements: fixed,
      selectedReplacement: fixed[0] || "",
      source: "Local",
      severity: "error",
      autoFixable: true,
    });
  }
  return issues;
}

function createStyleSuggestion(p: ParagraphLike, offset: number, length: number, ruleId: string, message: string, replacements: string[], autoFixable = true): Suggestion {
  return {
    id: Math.random().toString(36).substring(2, 11),
    paragraphIndex: p.paragraphIndex,
    paragraphText: p.text,
    offset,
    length,
    type: "style",
    ruleId,
    severity: autoFixable ? "error" : "warning",
    autoFixable,
    message,
    replacements,
    selectedReplacement: autoFixable ? replacements[0] || "" : "",
    source: "Document style",
  };
}

function isLikelyHeading(text: string): boolean {
  const t = text.trim();
  if (!t || t.length > 300) return false;
  return /^(abstract|introduction|methods?|results?|discussion|conclusion|references|appendix)\b/i.test(t) || (/^[A-Z0-9\s,;:()/-]+$/.test(t) && wordCount(t) > 1);
}

function isSkippedParagraph(text: string): boolean {
  return text.trim().startsWith("```") || /^(figure|fig\.|table)\s+\d+/i.test(text.trim()) || /[\t|]/.test(text);
}

function overlapsProtected(text: string, start: number, end: number): boolean {
  const patterns = [/`[^`]*`/g, /https?:\/\/\S+/gi, /\b(?:[A-Z][a-z]?\d*){2,}\b/g];
  return patterns.some(p => {
    let m;
    while ((m = p.exec(text)) !== null) {
      if (start < m.index + m[0].length && end > m.index) return true;
    }
    return false;
  });
}

function wordCount(text: string): number {
  return text.trim().match(/\b[\w'-]+\b/g)?.length || 0;
}

function getBlockAfterHeading(idx: number, ps: ParagraphLike[]): string {
  const block: string[] = [];
  for (let i = idx + 1; i < ps.length; i++) {
    if (isLikelyHeading(ps[i].text)) break;
    block.push(ps[i].text);
  }
  return block.join(" ");
}

function toTitleCase(s: string): string {
  const small = /^(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|via)$/i;
  return s.toLowerCase().split(/\s+/).map((w, i, a) => (i === 0 || i === a.length - 1 || !small.test(w)) ? w.charAt(0).toUpperCase() + w.slice(1) : w).join(" ");
}

function toSentenceCase(s: string): string {
  const t = s.trim().toLowerCase();
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function toOxfordIzeSpelling(word: string): string {
  return word
    .replace(/isations$/i, "izations")
    .replace(/isation$/i, "ization")
    .replace(/ysing$/i, "yzing")
    .replace(/ysed$/i, "yzed")
    .replace(/yses$/i, "yzes")
    .replace(/yse$/i, "yze")
    .replace(/ising$/i, "izing")
    .replace(/ised$/i, "ized")
    .replace(/ises$/i, "izes")
    .replace(/ise$/i, "ize");
}

function collectDateIssues(p: ParagraphLike): Suggestion[] {
  const issues: Suggestion[] = [];
  const occupied: Array<{ start: number; end: number }> = [];

  const addIssue = (offset: number, original: string, replacement: string) => {
    if (replacement === original || overlapsProtected(p.text, offset, offset + original.length)) return;
    if (occupied.some(r => offset < r.end && offset + original.length > r.start)) return;
    occupied.push({ start: offset, end: offset + original.length });
    issues.push(createStyleSuggestion(
      p,
      offset,
      original.length,
      "tf-uk-date-format",
      "Use UK date style: day month year, no ordinal suffixes or commas.",
      [replacement]
    ));
  };

  let match: RegExpExecArray | null;
  const compactRangeRegex = new RegExp(`\\b(\\d{1,2})\\s*(?:-|\\u2013|\\u2014|to)\\s*(\\d{1,2})\\s+(${MONTH_PATTERN})\\.?\\s+('?[0-9]{2}|[0-9]{4})\\b`, "gi");
  while ((match = compactRangeRegex.exec(p.text)) !== null) {
    addIssue(match.index, match[0], `${Number(match[1])}\u2013${Number(match[2])} ${normalizeMonth(match[3])} ${normalizeYear(match[4])}`);
  }

  const monthFirstRangeRegex = new RegExp(`\\b(${MONTH_PATTERN})\\.?\\s+(\\d{1,2})\\s*(?:-|\\u2013|\\u2014|to)\\s*(\\d{1,2}),?\\s+('?[0-9]{2}|[0-9]{4})\\b`, "gi");
  while ((match = monthFirstRangeRegex.exec(p.text)) !== null) {
    addIssue(match.index, match[0], `${Number(match[2])}\u2013${Number(match[3])} ${normalizeMonth(match[1])} ${normalizeYear(match[4])}`);
  }

  const monthFirstRegex = new RegExp(`\\b(${MONTH_PATTERN})\\.?\\s+(\\d{1,2})(?:st|nd|rd|th)?,?\\s+('?[0-9]{2}|[0-9]{4})\\b`, "gi");
  while ((match = monthFirstRegex.exec(p.text)) !== null) {
    addIssue(match.index, match[0], `${Number(match[2])} ${normalizeMonth(match[1])} ${normalizeYear(match[3])}`);
  }

  const dayFirstRegex = new RegExp(`\\b(\\d{1,2})(?:st|nd|rd|th)?\\s+(${MONTH_PATTERN})\\.?[,]?\\s+('?[0-9]{2}|[0-9]{4})\\b`, "gi");
  while ((match = dayFirstRegex.exec(p.text)) !== null) {
    addIssue(match.index, match[0], `${Number(match[1])} ${normalizeMonth(match[2])} ${normalizeYear(match[3])}`);
  }

  const monthYearCommaRegex = new RegExp(`\\b(${MONTH_PATTERN})\\.?,\\s+(\\d{4})\\b`, "gi");
  while ((match = monthYearCommaRegex.exec(p.text)) !== null) {
    addIssue(match.index, match[0], `${normalizeMonth(match[1])} ${match[2]}`);
  }

  const numericDateRegex = /\b(\d{1,4})[\/.-](\d{1,2})[\/.-](\d{1,4})\b/g;
  while ((match = numericDateRegex.exec(p.text)) !== null) {
    const parsed = parseNumericDate(match[1], match[2], match[3]);
    if (!parsed) continue;
    addIssue(match.index, match[0], `${parsed.day} ${MONTHS[parsed.month - 1]} ${parsed.year}`);
  }

  return issues;
}

function parseNumericDate(aText: string, bText: string, cText: string): { day: number; month: number; year: string } | null {
  const a = Number(aText);
  const b = Number(bText);
  const c = Number(cText);
  let day: number;
  let month: number;
  let year: string;

  if (aText.length === 4) {
    year = aText;
    month = b;
    day = c;
  } else {
    year = normalizeYear(cText);
    if (a > 12 && b <= 12) {
      day = a;
      month = b;
    } else if (b > 12 && a <= 12) {
      day = b;
      month = a;
    } else {
      day = a;
      month = b;
    }
  }

  if (month < 1 || month > 12 || day < 1 || day > 31 || Number.isNaN(c)) return null;
  return { day, month, year };
}

function normalizeMonth(month: string): string {
  return MONTH_ALIASES[month.replace(/\.$/, "").toLowerCase()];
}

function normalizeYear(year: string): string {
  const cleaned = year.replace(/^'/, "");
  if (cleaned.length === 2) {
    return Number(cleaned) < 50 ? `20${cleaned}` : `19${cleaned}`;
  }
  return cleaned;
}

function preserveCase(source: string, replacement: string): string {
  if (source === source.toUpperCase()) return replacement.toUpperCase();
  if (/^[A-Z]/.test(source)) return replacement.charAt(0).toUpperCase() + replacement.slice(1);
  return replacement;
}

export function mergeSuggestions(remote: Suggestion[], local: Suggestion[]): Suggestion[] {
  const merged: Suggestion[] = [];
  const seen = new Set<string>();
  [...remote, ...local].forEach(s => {
    const k = `${s.paragraphIndex}:${s.offset}:${s.length}`;
    if (!seen.has(k)) { seen.add(k); merged.push(s); }
  });
  return merged;
}

export function groupSuggestionsByParagraph(suggestions: Suggestion[]) {
  const grouped = new Map<number, Suggestion[]>();
  suggestions.forEach(s => {
    if (!grouped.has(s.paragraphIndex)) grouped.set(s.paragraphIndex, []);
    grouped.get(s.paragraphIndex)!.push(s);
  });
  return grouped;
}

export function countOccurrencesBefore(text: string, search: string, offset: number): number {
  if (!search) return 0;
  let count = 0, idx = text.indexOf(search);
  while (idx !== -1 && idx < offset) { count++; idx = text.indexOf(search, idx + search.length); }
  return count;
}
