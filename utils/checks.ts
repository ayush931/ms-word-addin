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

// --- Main Entry Points ---

/**
 * Quick checks for common typos and spacing errors.
 */
export function runLocalChecks(paragraph: ParagraphLike): Suggestion[] {
  return [
    ...findRegexIssues(paragraph, /\b(teh)\b/gi, "spelling", "Possible spelling mistake.", ["the"]),
    ...findRegexIssues(paragraph, /\b(recieve|recieved|recieving)\b/gi, "spelling", "Possible spelling mistake.", ["receive"]),
    ...findRegexIssues(paragraph, /\b(seperate|seperated|seperately)\b/gi, "spelling", "Possible spelling mistake.", ["separate"]),
    ...findRegexIssues(paragraph, /\b(definately)\b/gi, "spelling", "Possible spelling mistake.", ["definitely"]),
    ...findRegexIssues(paragraph, /\b(alot)\b/gi, "spelling", "Possible spelling mistake.", ["a lot"]),
    ...findRegexIssues(paragraph, / {2,}/g, "grammar", "Use one space.", [" "]),
    ...findRegexIssues(paragraph, /\b(\w+)\s+\1\b/gi, "grammar", "Repeated word.", ["$1"]),
    ...findRegexIssues(paragraph, /\b(i)\b/g, "grammar", "Capitalize the pronoun.", ["I"]),
    ...findRegexIssues(paragraph, /\s+([,.!?;:])/g, "grammar", "Remove the space before punctuation.", ["$1"]),
    ...findRegexIssues(paragraph, /([!?]){2,}/g, "grammar", "Use one punctuation mark.", ["$1"]),
    ...findRegexIssues(paragraph, /([,;:!?])(?=\S)/g, "grammar", "Add a space after punctuation.", ["$1 "]),
    ...findRegexIssues(paragraph, /([A-Za-z]{3,}\.)(?=[A-Z][a-z])/g, "grammar", "Add a space after the period.", ["$1 "]),
  ];
}

/**
 * Comprehensive checks for consistency and professional styling.
 */
export function runDocumentStyleChecks(paragraphs: ParagraphLike[]): Suggestion[] {
  const fullText = paragraphs.map((p) => p.text).join("\n");
  const variant = detectEnglishVariant(fullText);
  const dateStyle = detectDateStyle(fullText);

  return [
    ...findDashConsistencyIssues(paragraphs),
    ...findQuotationIssues(paragraphs, variant),
    ...findQuotePunctuationIssues(paragraphs, variant),
    ...findApostropheIssues(paragraphs),
    ...findHeadingIssues(paragraphs),
    ...findDateConsistencyIssues(paragraphs, dateStyle),
    ...findAbbreviationIssues(paragraphs),
    ...findSerialCommaIssues(paragraphs),
    ...findTableFigureNumberingIssues(paragraphs),
    ...findOperatorSpacingIssues(paragraphs),
  ];
}

// --- Check Implementations ---

function findDashConsistencyIssues(paragraphs: ParagraphLike[]): Suggestion[] {
  const issues: Suggestion[] = [];
  for (const p of paragraphs) {
    if (isSkippedParagraph(p.text)) continue;

    // 1. En Dash for Ranges
    const rangeRegex = /\b([A-Za-z]+|\d{1,4})(-)([A-Za-z]+|\d{1,4})\b/g;
    let match: RegExpExecArray | null;
    while ((match = rangeRegex.exec(p.text)) !== null) {
      const [original, left, , right] = match;
      const isRange = RANGE_WORDS.has(left) && RANGE_WORDS.has(right);
      const isNumeric = /^\d/.test(left) && /^\d/.test(right);
      const isProperNounPair = /^[A-Z]/.test(left) && /^[A-Z]/.test(right);

      if ((isRange || isNumeric || isProperNounPair) && !overlapsProtected(p.text, match.index, match.index + original.length)) {
        issues.push(createStyleSuggestion(p, match.index, original.length, "en-dash-range", "Use an en dash (–) for ranges or related terms.", [`${left}–${right}`]));
      }
    }

    // 2. Em Dash Spacing
    const spacedEmDash = /\s+—\s+/g;
    while ((match = spacedEmDash.exec(p.text)) !== null) {
      issues.push(createStyleSuggestion(p, match.index, match[0].length, "em-dash-spacing", "Em dashes should be unspaced.", ["—"]));
    }

    // 3. Double Hyphen to Em Dash
    const doubleHyphen = /([A-Za-z])--([A-Za-z])/g;
    while ((match = doubleHyphen.exec(p.text)) !== null) {
      issues.push(createStyleSuggestion(p, match.index, match[0].length, "em-dash-substitution", "Use an em dash (—) instead of double hyphens.", [`${match[1]}—${match[2]}`]));
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
      issues.push(createStyleSuggestion(p, match.index, match[0].length, "quotation-style", variant === "us" ? "Use curly double quotes for primary quotes." : "Use curly double quotes for nested quotes.", [`“${match[1]}”`]));
    }

    const singleRegex = /(?<!\w)'([^'\n]+)'(?!\w)/g;
    while ((match = singleRegex.exec(p.text)) !== null) {
      if (overlapsProtected(p.text, match.index, match.index + match[0].length)) continue;
      issues.push(createStyleSuggestion(p, match.index, match[0].length, "quotation-style", variant === "uk" ? "Use curly single quotes for primary quotes." : "Use curly single quotes for nested quotes.", [`‘${match[1]}’`]));
    }
  }
  return issues;
}

function findQuotePunctuationIssues(paragraphs: ParagraphLike[], variant: "us" | "uk"): Suggestion[] {
  const issues: Suggestion[] = [];
  for (const p of paragraphs) {
    if (isSkippedParagraph(p.text)) continue;

    if (variant === "us") {
      const regex = /["'”’]([. , ; :])/g; // Punctuation outside
      let match: RegExpExecArray | null;
      while ((match = regex.exec(p.text)) !== null) {
        if (overlapsProtected(p.text, match.index, match.index + match[0].length)) continue;
        issues.push(createStyleSuggestion(p, match.index, 2, "quote-punctuation-us", "Place periods and commas inside quotation marks (US).", [`${match[1]}${match[0][0]}`]));
      }
    } else {
      const regex = /([. , ; :])["'”’]/g; // Punctuation inside
      let match: RegExpExecArray | null;
      while ((match = regex.exec(p.text)) !== null) {
        if (overlapsProtected(p.text, match.index, match.index + match[0].length)) continue;
        issues.push(createStyleSuggestion(p, match.index, 2, "quote-punctuation-uk", "Place periods and commas outside quotation marks (UK).", [`${match[0][1]}${match[1]}`]));
      }
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
      issues.push(createStyleSuggestion(p, match.index, match[0].length, "smart-apostrophe", "Use a curly typographic apostrophe.", [match[0].replace(/'/g, "’")]));
    }
  }
  return issues;
}

function findHeadingIssues(paragraphs: ParagraphLike[]): Suggestion[] {
  const issues: Suggestion[] = [];
  const headings = paragraphs.filter(p => isLikelyHeading(p.text));
  
  // Detect dominant casing
  let score = 0;
  headings.forEach(h => {
    const words = h.text.trim().split(/\s+/);
    const caps = words.filter(w => /^[A-Z]/.test(w)).length;
    score += (caps > words.length / 2) ? 1 : -1;
  });
  const dominant = score >= 0 ? "title" : "sentence";

  for (const p of paragraphs) {
    const text = p.text.trim();
    if (!text) continue;

    // Running Head check
    if (p.paragraphIndex < 3 && text.length > 65 && !isLikelyHeading(text)) {
      issues.push(createStyleSuggestion(p, p.text.indexOf(text), text.length, "running-head-length", "Running head exceeds 65 characters.", [], false));
    }

    if (isLikelyHeading(text)) {
      // Length check
      if (wordCount(text) > 60) {
        issues.push(createStyleSuggestion(p, p.text.indexOf(text), text.length, "heading-length", "Heading exceeds 60 words.", [], false));
      }
      // Casing check
      const isTitle = text.split(/\s+/).filter(w => /^[A-Z]/.test(w)).length > wordCount(text) / 2;
      if (dominant === "title" && !isTitle) {
        issues.push(createStyleSuggestion(p, p.text.indexOf(text), text.length, "heading-casing", "Follow Title Case style.", [toTitleCase(text)], false));
      } else if (dominant === "sentence" && isTitle) {
        issues.push(createStyleSuggestion(p, p.text.indexOf(text), text.length, "heading-casing", "Follow Sentence case style.", [toSentenceCase(text)], false));
      }
    }

    // Abstract check
    if (/^abstract:?$/i.test(text)) {
      const count = wordCount(getBlockAfterHeading(p.paragraphIndex, paragraphs));
      if (count < 150 || count > 200) {
        issues.push(createStyleSuggestion(p, 0, p.text.length, "abstract-word-count", `Abstract is ${count} words (Target: 150-200).`, [], false));
      }
    }
  }
  return issues;
}

function findDateConsistencyIssues(paragraphs: ParagraphLike[], dominant: "us" | "uk"): Suggestion[] {
  const issues: Suggestion[] = [];
  for (const p of paragraphs) {
    if (isSkippedParagraph(p.text)) continue;

    const wrongRegex = dominant === "us" ? dayMonthRegex("g") : monthDateRegex("g");
    let match: RegExpExecArray | null;
    while ((match = wrongRegex.exec(p.text)) !== null) {
      const replacement = dominant === "us" ? `${match[2]} ${Number(match[1])}, ${match[3]}` : `${Number(match[1])} ${match[2]} ${match[3]}`;
      issues.push(createStyleSuggestion(p, match.index, match[0].length, "date-format", `Use dominant ${dominant.toUpperCase()} date style.`, [replacement]));
    }
  }
  return issues;
}

function findAbbreviationIssues(paragraphs: ParagraphLike[]): Suggestion[] {
  const issues: Suggestion[] = [];
  const defined = new Set<string>();

  for (const p of paragraphs) {
    if (isSkippedParagraph(p.text)) continue;

    // Definitions
    const defRegex = /\b([A-Z][A-Za-z]+(?:\s+[A-Z][A-Za-z]+)+)\s*\(([A-Za-z]{2,})\)/g;
    let match: RegExpExecArray | null;
    while ((match = defRegex.exec(p.text)) !== null) {
      const abbr = match[2].toUpperCase();
      defined.add(abbr);
      if (!match[0].includes(" (")) {
        issues.push(createStyleSuggestion(p, match.index, match[0].length, "abbr-spacing", "Space before parentheses.", [`${match[1]} (${match[2]})`]));
      }
    }

    // Usage check
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
  let serial = 0, noSerial = 0;
  paragraphs.forEach(p => {
    if (isSkippedParagraph(p.text)) return;
    serial += countMatches(p.text, /\w+,\s+\w+,\s+and\s+\w+/g);
    noSerial += countMatches(p.text, /\w+,\s+\w+\s+and\s+\w+/g);
  });

  const useSerial = serial >= noSerial;
  const issues: Suggestion[] = [];
  for (const p of paragraphs) {
    if (isSkippedParagraph(p.text)) continue;
    const regex = useSerial ? /(\w+),\s+(\w+)\s+and\s+(\w+)/g : /(\w+),\s+(\w+),\s+and\s+(\w+)/g;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(p.text)) !== null) {
      const fix = useSerial ? `${match[1]}, ${match[2]}, and ${match[3]}` : `${match[1]}, ${match[2]} and ${match[3]}`;
      issues.push(createStyleSuggestion(p, match.index, match[0].length, "serial-comma", useSerial ? "Add serial comma." : "Remove serial comma.", [fix]));
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

function findRegexIssues(p: ParagraphLike, regex: RegExp, type: SuggestionType, message: string, replacements: string[]): Suggestion[] {
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

function detectEnglishVariant(t: string): "us" | "uk" {
  const us = countMatches(t, /\b(color|analyze|organization|behavior|center)\b/gi);
  const uk = countMatches(t, /\b(colour|analyse|organisation|behaviour|centre)\b/gi);
  return uk > us ? "uk" : "us";
}

function detectDateStyle(t: string): "us" | "uk" {
  const us = countMatches(t, monthDateRegex("g"));
  const uk = countMatches(t, dayMonthRegex("g"));
  return uk > us ? "uk" : "us";
}

function monthDateRegex(f = ""): RegExp { return new RegExp(`\\b(${MONTHS.join("|")})\\s+(\\d{1,2}),\\s+(\\d{4})\\b`, f); }
function dayMonthRegex(f = ""): RegExp { return new RegExp(`\\b(\\d{1,2})\\s+(${MONTHS.join("|")})\\s+(\\d{4})\\b`, f); }

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

function countMatches(t: string, r: RegExp): number { return Array.from(t.matchAll(r)).length; }
