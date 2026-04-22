import { Suggestion, SuggestionType } from "../types/suggestion";

type ParagraphLike = { text: string; paragraphIndex: number };

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const RANGE_WORDS = new Set([
  ...MONTHS,
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
]);
const KNOWN_ABBREVIATIONS = new Set([
  "AI", "API", "CPU", "CSS", "DNA", "DOI", "GPU", "HTML", "HTTP", "HTTPS",
  "MRI", "NASA", "NLP", "PDF", "RNA", "URL", "XML", "JSON", "UI",
]);

/**
 * Runs various local grammar and spelling checks on a paragraph's text.
 * These checks are quick and don't require external API calls.
 */
export function runLocalChecks(paragraph: ParagraphLike): Suggestion[] {
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

export function runDocumentStyleChecks(paragraphs: ParagraphLike[]): Suggestion[] {
  const variant = detectEnglishVariant(paragraphs.map((p) => p.text).join("\n"));
  const dateStyle = detectDateStyle(paragraphs.map((p) => p.text).join("\n"));

  return [
    ...findOperatorSpacingIssues(paragraphs),
    ...findRangeHyphenIssues(paragraphs),
    ...findQuoteIssues(paragraphs, variant),
    ...findApostropheIssues(paragraphs),
    ...findAbstractWordCountIssues(paragraphs),
    ...findLongHeadingIssues(paragraphs),
    ...findDateIssues(paragraphs, dateStyle),
    ...findAbbreviationIssues(paragraphs),
  ];
}

/**
 * Identifies issues in text based on a regular expression and returns formal suggestions.
 */
function findRegexIssues(
  paragraph: ParagraphLike,
  regex: RegExp,
  type: SuggestionType,
  message: string,
  replacements: string[]
): Suggestion[] {
  const issues: Suggestion[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(paragraph.text)) !== null) {
    const replacementValues = replacements.map((r) => r.replace("$1", match![1] || ""));
    issues.push({
      id: Math.random().toString(36).substring(2, 11),
      paragraphIndex: paragraph.paragraphIndex,
      paragraphText: paragraph.text,
      offset: match.index,
      length: match[0].length,
      type,
      message,
      replacements: replacementValues,
      selectedReplacement: replacementValues[0] || "",
      source: "Local",
      severity: "error",
      autoFixable: true,
    });
  }
  return issues;
}

function createSuggestion(
  paragraph: ParagraphLike,
  offset: number,
  length: number,
  ruleId: string,
  message: string,
  replacements: string[],
  autoFixable = true,
  severity: "error" | "warning" = autoFixable ? "error" : "warning"
): Suggestion {
  return {
    id: Math.random().toString(36).substring(2, 11),
    paragraphIndex: paragraph.paragraphIndex,
    paragraphText: paragraph.text,
    offset,
    length,
    type: "style",
    ruleId,
    severity,
    autoFixable,
    message,
    replacements,
    selectedReplacement: autoFixable ? replacements[0] || "" : "",
    source: "Document style",
  };
}

function isSkippedParagraph(text: string): boolean {
  const trimmed = text.trim();
  return trimmed.startsWith("```")
    || /^(```|~~~)/.test(trimmed)
    || /^(figure|fig\.|table)\s+\d+/i.test(trimmed)
    || /[\t|]/.test(text);
}

function protectedRanges(text: string) {
  const ranges: Array<[number, number]> = [];
  const patterns = [
    /`[^`]*`/g,
    /https?:\/\/\S+/gi,
    /www\.\S+/gi,
    /\b(?:[A-Z][a-z]?\d*){2,}\b/g,
  ];

  for (const pattern of patterns) {
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(text)) !== null) {
      ranges.push([match.index, match.index + match[0].length]);
    }
  }
  return ranges;
}

function overlapsProtected(text: string, start: number, end: number): boolean {
  return protectedRanges(text).some(([rangeStart, rangeEnd]) => start < rangeEnd && end > rangeStart);
}

function wordCount(text: string): number {
  return text.trim().match(/\b[\w'-]+\b/g)?.length || 0;
}

function findOperatorSpacingIssues(paragraphs: ParagraphLike[]): Suggestion[] {
  const issues: Suggestion[] = [];

  for (const paragraph of paragraphs) {
    if (isSkippedParagraph(paragraph.text)) continue;

    const regex = /\b[\w.]+(?:\s*[-+*/=]\s*[\w.]+)+\b/g;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(paragraph.text)) !== null) {
      const original = match[0];
      if (!/[+*/=]/.test(original) || overlapsProtected(paragraph.text, match.index, match.index + original.length)) {
        continue;
      }

      const replacement = original.replace(/\s*([-+*/=])\s*/g, " $1 ").replace(/\s{2,}/g, " ");
      if (replacement !== original) {
        issues.push(createSuggestion(
          paragraph,
          match.index,
          original.length,
          "operator-spacing",
          "Use exactly one space before and after binary arithmetic operators.",
          [replacement]
        ));
      }
    }
  }

  return issues;
}

function findRangeHyphenIssues(paragraphs: ParagraphLike[]): Suggestion[] {
  const issues: Suggestion[] = [];

  for (const paragraph of paragraphs) {
    if (isSkippedParagraph(paragraph.text)) continue;

    const regex = /\b([A-Za-z]+|\d{1,4})(-)([A-Za-z]+|\d{1,4})\b/g;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(paragraph.text)) !== null) {
      const [original, left, , right] = match;
      const isNumericRange = /^\d/.test(left) && /^\d/.test(right);
      const isNamedRange = RANGE_WORDS.has(left) && RANGE_WORDS.has(right);
      if ((!isNumericRange && !isNamedRange) || overlapsProtected(paragraph.text, match.index, match.index + original.length)) {
        continue;
      }

      issues.push(createSuggestion(
        paragraph,
        match.index,
        original.length,
        "en-dash-range",
        "Use an en dash for numeric, date, or named ranges.",
        [`${left}–${right}`]
      ));
    }
  }

  return issues;
}

function detectEnglishVariant(text: string): "us" | "uk" {
  const us = countMatches(text, /\b(color|analyze|analyzed|organization|behavior|center)\b/gi)
    + countMatches(text, monthDateRegex("g"));
  const uk = countMatches(text, /\b(colour|analyse|analysed|organisation|behaviour|centre)\b/gi)
    + countMatches(text, dayMonthRegex("g"));
  return uk > us ? "uk" : "us";
}

function findQuoteIssues(paragraphs: ParagraphLike[], variant: "us" | "uk"): Suggestion[] {
  const issues: Suggestion[] = [];

  for (const paragraph of paragraphs) {
    if (isSkippedParagraph(paragraph.text)) continue;

    const doubleQuoteRegex = /"([^"\n]+)"/g;
    let doubleMatch: RegExpExecArray | null;
    while ((doubleMatch = doubleQuoteRegex.exec(paragraph.text)) !== null) {
      if (overlapsProtected(paragraph.text, doubleMatch.index, doubleMatch.index + doubleMatch[0].length)) continue;
      issues.push(createSuggestion(
        paragraph,
        doubleMatch.index,
        doubleMatch[0].length,
        "quotation-style",
        variant === "us"
          ? "Use curly double quotation marks for primary US English quotes."
          : "Use curly double quotation marks only for nested UK English quotes.",
        [`“${doubleMatch[1]}”`]
      ));
    }

    const singleQuoteRegex = /(?<!\w)'([^'\n]+)'(?!\w)/g;
    let singleMatch: RegExpExecArray | null;
    while ((singleMatch = singleQuoteRegex.exec(paragraph.text)) !== null) {
      if (overlapsProtected(paragraph.text, singleMatch.index, singleMatch.index + singleMatch[0].length)) continue;
      issues.push(createSuggestion(
        paragraph,
        singleMatch.index,
        singleMatch[0].length,
        "quotation-style",
        variant === "uk"
          ? "Use curly single quotation marks for primary UK English quotes."
          : "Use curly single quotation marks for nested US English quotes.",
        [`‘${singleMatch[1]}’`]
      ));
    }
  }

  return issues;
}

function findApostropheIssues(paragraphs: ParagraphLike[]): Suggestion[] {
  const issues: Suggestion[] = [];

  for (const paragraph of paragraphs) {
    if (isSkippedParagraph(paragraph.text)) continue;

    const regex = /\b[A-Za-z]+'[A-Za-z]+\b|'\d{2}s\b/g;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(paragraph.text)) !== null) {
      if (overlapsProtected(paragraph.text, match.index, match.index + match[0].length)) continue;
      issues.push(createSuggestion(
        paragraph,
        match.index,
        match[0].length,
        "smart-apostrophe",
        "Use a typographic apostrophe.",
        [match[0].replace(/'/g, "’")]
      ));
    }
  }

  return issues;
}

function findAbstractWordCountIssues(paragraphs: ParagraphLike[]): Suggestion[] {
  const headingIndex = paragraphs.findIndex((p) => /^abstract:?$/i.test(p.text.trim()));
  if (headingIndex === -1) return [];

  const abstractParagraphs: string[] = [];
  for (let i = headingIndex + 1; i < paragraphs.length; i++) {
    const text = paragraphs[i].text.trim();
    if (!text) continue;
    if (isLikelyHeading(text)) break;
    abstractParagraphs.push(text);
  }

  const count = wordCount(abstractParagraphs.join(" "));
  if (count >= 150 && count <= 200) return [];

  const heading = paragraphs[headingIndex];
  return [createSuggestion(
    heading,
    0,
    heading.text.length,
    "abstract-word-count",
    `Abstract is ${count} words; required range is 150-200 words.`,
    [],
    false
  )];
}

function findLongHeadingIssues(paragraphs: ParagraphLike[]): Suggestion[] {
  const issues: Suggestion[] = [];

  for (const paragraph of paragraphs) {
    const text = paragraph.text.trim();
    if (!isLikelyHeading(text)) continue;
    const count = wordCount(text);
    if (count <= 60) continue;

    issues.push(createSuggestion(
      paragraph,
      Math.max(0, paragraph.text.indexOf(text)),
      text.length,
      "heading-length",
      `Heading is ${count} words; trim it to 60 words or fewer.`,
      [],
      false
    ));
  }

  return issues;
}

function detectDateStyle(text: string): "us" | "uk" {
  const us = countMatches(text, monthDateRegex("g"));
  const uk = countMatches(text, dayMonthRegex("g"));
  return uk > us ? "uk" : "us";
}

function findDateIssues(paragraphs: ParagraphLike[], dominantStyle: "us" | "uk"): Suggestion[] {
  const issues: Suggestion[] = [];

  for (const paragraph of paragraphs) {
    if (isSkippedParagraph(paragraph.text)) continue;

    const wrongStyleRegex = dominantStyle === "us" ? dayMonthRegex("g") : monthDateRegex("g");
    let match: RegExpExecArray | null;
    while ((match = wrongStyleRegex.exec(paragraph.text)) !== null) {
      const replacement = dominantStyle === "us"
        ? toUsDate(match[1], match[2], match[3])
        : toUkDate(match[1], match[2], match[3]);
      issues.push(createSuggestion(
        paragraph,
        match.index,
        match[0].length,
        "date-format-consistency",
        dominantStyle === "us"
          ? "Use the dominant US date style: Month DD, YYYY."
          : "Use the dominant UK date style: DD Month YYYY.",
        [replacement]
      ));
    }

    const numericDateRegex = /\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/g;
    while ((match = numericDateRegex.exec(paragraph.text)) !== null) {
      const first = Number(match[1]);
      const second = Number(match[2]);
      const ambiguous = first <= 12 && second <= 12;
      if (!ambiguous) continue;

      issues.push(createSuggestion(
        paragraph,
        match.index,
        match[0].length,
        "ambiguous-date",
        "Numeric date is ambiguous; use a spelled-out date format.",
        [],
        false
      ));
    }
  }

  return issues;
}

function findAbbreviationIssues(paragraphs: ParagraphLike[]): Suggestion[] {
  const issues: Suggestion[] = [];
  const definitions = new Map<string, string>();
  const definedAbbreviations = new Set<string>();

  for (const paragraph of paragraphs) {
    if (isSkippedParagraph(paragraph.text)) continue;

    const spacingRegex = /\b([A-Z][A-Za-z]+(?:\s+[A-Z][A-Za-z]+)+)\(([A-Za-z]{2,})\)/g;
    let spacingMatch: RegExpExecArray | null;
    while ((spacingMatch = spacingRegex.exec(paragraph.text)) !== null) {
      issues.push(createSuggestion(
        paragraph,
        spacingMatch.index,
        spacingMatch[0].length,
        "abbreviation-spacing",
        "Use one space between the full form and its abbreviation.",
        [`${spacingMatch[1]} (${spacingMatch[2].toUpperCase()})`]
      ));
    }

    const definitionRegex = /\b([A-Z][A-Za-z]+(?:\s+[A-Z][A-Za-z]+)+)\s+\(([A-Za-z]{2,})\)/g;
    let definitionMatch: RegExpExecArray | null;
    while ((definitionMatch = definitionRegex.exec(paragraph.text)) !== null) {
      const fullForm = definitionMatch[1];
      const abbreviation = definitionMatch[2].toUpperCase();
      definitions.set(fullForm.toLowerCase(), abbreviation);
      definedAbbreviations.add(abbreviation);

      if (definitionMatch[2] !== abbreviation) {
        issues.push(createSuggestion(
          paragraph,
          definitionMatch.index,
          definitionMatch[0].length,
          "abbreviation-capitals",
          "Use full capitals for abbreviations.",
          [`${fullForm} (${abbreviation})`]
        ));
      }
    }

    const wordRegex = /\b[A-Za-z]{2,}\b/g;
    let wordMatch: RegExpExecArray | null;
    while ((wordMatch = wordRegex.exec(paragraph.text)) !== null) {
      const token = wordMatch[0];
      const upper = token.toUpperCase();
      if (KNOWN_ABBREVIATIONS.has(upper) && token !== upper) {
        issues.push(createSuggestion(
          paragraph,
          wordMatch.index,
          token.length,
          "abbreviation-capitals",
          "Use full capitals for abbreviations.",
          [upper]
        ));
      } else if (KNOWN_ABBREVIATIONS.has(upper) && token === upper && !definedAbbreviations.has(upper)) {
        issues.push(createSuggestion(
          paragraph,
          wordMatch.index,
          token.length,
          "abbreviation-first-use",
          "Define this abbreviation on first use with the full form followed by the abbreviation in parentheses.",
          [],
          false
        ));
      }
    }

    for (const [fullForm, abbreviation] of Array.from(definitions)) {
      const fullFormRegex = new RegExp(`\\b${escapeRegExp(fullForm)}\\b`, "gi");
      let fullFormMatch: RegExpExecArray | null;
      while ((fullFormMatch = fullFormRegex.exec(paragraph.text)) !== null) {
        const following = paragraph.text.slice(fullFormMatch.index + fullFormMatch[0].length, fullFormMatch.index + fullFormMatch[0].length + abbreviation.length + 4);
        if (/^\s*\(/.test(following)) continue;
        issues.push(createSuggestion(
          paragraph,
          fullFormMatch.index,
          fullFormMatch[0].length,
          "abbreviation-consistency",
          `Use the defined abbreviation "${abbreviation}" after first definition.`,
          [abbreviation]
        ));
      }
    }
  }

  return issues;
}

function isLikelyHeading(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed || trimmed.length > 500) return false;
  if (/^abstract:?$/i.test(trimmed)) return true;
  if (/^[A-Z][A-Z0-9\s,;:()/-]+$/.test(trimmed) && wordCount(trimmed) > 1) return true;
  return /^(introduction|methods?|results?|discussion|conclusion|references|background|appendix)\b/i.test(trimmed);
}

function monthDateRegex(flags = ""): RegExp {
  return new RegExp(`\\b(${MONTHS.join("|")})\\s+(\\d{1,2}),\\s+(\\d{4})\\b`, flags);
}

function dayMonthRegex(flags = ""): RegExp {
  return new RegExp(`\\b(\\d{1,2})\\s+(${MONTHS.join("|")})\\s+(\\d{4})\\b`, flags);
}

function toUsDate(day: string, month: string, year: string): string {
  return `${month} ${Number(day)}, ${year}`;
}

function toUkDate(month: string, day: string, year: string): string {
  return `${Number(day)} ${month} ${year}`;
}

function countMatches(text: string, regex: RegExp): number {
  return Array.from(text.matchAll(regex)).length;
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Merges suggestions from different sources (remote/local) while removing duplicates.
 * A suggestion is considered a duplicate if it covers the same range in the document.
 */
export function mergeSuggestions(remote: Suggestion[], local: Suggestion[]): Suggestion[] {
  const seenRanges = new Set<string>();
  const merged: Suggestion[] = [];

  for (const s of [...remote, ...local]) {
    const rangeKey = `${s.paragraphIndex}:${s.offset}:${s.length}`;
    if (!seenRanges.has(rangeKey) && s.selectedReplacement) {
      seenRanges.add(rangeKey);
      merged.push(s);
    }
  }

  return merged;
}

/**
 * Utility for grouping suggestions by their paragraph index for efficient processing.
 */
export function groupSuggestionsByParagraph(suggestions: Suggestion[]) {
  const grouped = new Map<number, Suggestion[]>();
  for (const s of suggestions) {
    if (!grouped.has(s.paragraphIndex)) {
      grouped.set(s.paragraphIndex, []);
    }
    grouped.get(s.paragraphIndex)!.push(s);
  }
  return grouped;
}

/**
 * Efficiently counts how many times a substring occurs before a given character offset.
 * Useful for finding the correct occurrence of a match in a paragraph.
 */
export function countOccurrencesBefore(text: string, search: string, offset: number): number {
  if (!search) return 0;
  let count = 0;
  let idx = text.indexOf(search);
  while (idx !== -1 && idx < offset) {
    count++;
    idx = text.indexOf(search, idx + search.length);
  }
  return count;
}
