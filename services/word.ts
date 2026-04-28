import { Suggestion } from "../types/suggestion";
import { groupSuggestionsByParagraph, countOccurrencesBefore } from "../utils/checks";
import { AppError, ErrorCode, handleServiceError } from "../utils/errors";

const WORD_SEARCH_MAX_LENGTH = 255;

function getWordApi() {
  const word = (globalThis as typeof globalThis & { Word?: typeof Word }).Word;
  if (!word?.run) {
    throw new AppError(ErrorCode.WORD_NOT_FOUND, "Open this add-in in Word to scan a document.");
  }

  return word;
}

export interface ParagraphData {
  paragraphIndex: number;
  text: string;
}

function isValidWordSearchText(text: string): boolean {
  if (!text) return false;
  if (/^[\s\u00A0]+$/.test(text)) return false;
  if (/[\r\n]/.test(text)) return false;
  if (text.length > WORD_SEARCH_MAX_LENGTH) return false;
  return true;
}

/**
 * Service for interacting with the Microsoft Word document.
 */

/**
 * Reads all paragraphs from the document and normalizes their text.
 */
export async function readParagraphs(): Promise<ParagraphData[]> {
  try {
    const word = getWordApi();

    return await word.run<ParagraphData[]>(async (context) => {
      const paragraphs = context.document.body.paragraphs;
      paragraphs.load("items/text");
      await context.sync();

      return paragraphs.items.map((paragraph, index) => ({
        paragraphIndex: index,
        text: paragraph.text.replace(/\r/g, ""),
      }));
    });
  } catch (error) {
    return handleServiceError(error, ErrorCode.WORD_SYNC_FAILED);
  }
}

interface PendingHighlight {
  s: Suggestion;
  original: string;
  matches: Word.RangeCollection;
}

/**
 * Sets highlighing on specific ranges of text in the document.
 */
export async function setSuggestionHighlights(suggestions: Suggestion[], highlightColor: string | null) {
  if (!suggestions.length) return;

  try {
    const word = getWordApi();

    await word.run(async (context) => {
      const paragraphs = context.document.body.paragraphs;
      paragraphs.load("items");
      await context.sync();

      const grouped = groupSuggestionsByParagraph(suggestions);
      const pending: PendingHighlight[] = [];

      for (const [pIdx, pSuggestions] of Array.from(grouped)) {
        const paragraph = paragraphs.items[pIdx];
        if (!paragraph) continue;

        for (const s of pSuggestions) {
          const original = s.paragraphText.slice(s.offset, s.offset + s.length);
          if (!isValidWordSearchText(original)) continue;

          const matches = paragraph.search(original, { matchCase: true, matchWholeWord: false });
          matches.load("items");
          pending.push({ s, original, matches });
        }
      }

      if (pending.length > 0) {
        await context.sync();

        for (const { s, original, matches } of pending) {
          const occIdx = countOccurrencesBefore(s.paragraphText, original, s.offset);
          const target = matches.items[occIdx] || matches.items[0];
          if (target) {
            (target.font as any).highlightColor = highlightColor;
          }
        }
        await context.sync();
      }
    });
  } catch (error) {
    console.warn("Could not update highlights in Word.", error);
    // We don't throw here as highlighting is non-critical
  }
}

/**
 * Moves the Word selection to the issue range for a suggestion.
 */
export async function selectSuggestionText(suggestion: Suggestion) {
  try {
    const original = suggestion.paragraphText.slice(suggestion.offset, suggestion.offset + suggestion.length);
    const canSearchOriginal = isValidWordSearchText(original);
    const occIdx = countOccurrencesBefore(suggestion.paragraphText, original, suggestion.offset);
    const word = getWordApi();

    await word.run(async (context) => {
      const paragraphs = context.document.body.paragraphs;
      paragraphs.load("items");
      await context.sync();

      const paragraph = paragraphs.items[suggestion.paragraphIndex];
      if (!paragraph) throw new AppError(ErrorCode.PARAGRAPH_CHANGED, "Paragraph changed. Please scan again.");

      if (!canSearchOriginal) {
        (paragraph as any).getRange().select();
        await context.sync();
        return;
      }

      const matches = paragraph.search(original, { matchCase: true, matchWholeWord: false });
      matches.load("items");
      await context.sync();

      const target = matches.items[occIdx] || matches.items[0];
      if (target) {
        target.select();
      } else {
        (paragraph as any).getRange().select();
      }

      await context.sync();
    });
  } catch (error) {
    return handleServiceError(error, ErrorCode.WORD_SELECTION_FAILED);
  }
}

/**
 * Replaces the original text of a suggestion with the selected replacement.
 */
export async function replaceSuggestionText(suggestion: Suggestion) {
  if (suggestion.autoFixable === false || !suggestion.selectedReplacement) {
    throw new AppError(ErrorCode.MANUAL_REVIEW_REQUIRED, "This issue needs manual review.");
  }

  try {
    const original = suggestion.paragraphText.slice(suggestion.offset, suggestion.offset + suggestion.length);
    if (!isValidWordSearchText(original)) {
      throw new AppError(
        ErrorCode.WORD_REPLACEMENT_FAILED,
        "The selected text cannot be safely located in Word. Please review this suggestion manually."
      );
    }
    const occIdx = countOccurrencesBefore(suggestion.paragraphText, original, suggestion.offset);
    const word = getWordApi();

    await word.run(async (context) => {
      const paragraphs = context.document.body.paragraphs;
      paragraphs.load("items");
      await context.sync();

      const paragraph = paragraphs.items[suggestion.paragraphIndex];
      if (!paragraph) throw new AppError(ErrorCode.PARAGRAPH_CHANGED, "Paragraph changed. Please scan again.");

      const matches = paragraph.search(original, { matchCase: true, matchWholeWord: false });
      matches.load("items");
      await context.sync();

      const target = matches.items[occIdx] || matches.items[0];
      if (!target) throw new AppError(ErrorCode.WORD_REPLACEMENT_FAILED, "Original text not found in the paragraph. Please scan again.");

      target.font.highlightColor = null as any;
      target.insertText(suggestion.selectedReplacement, word.InsertLocation.replace);
      await context.sync();
    });
  } catch (error) {
    return handleServiceError(error, ErrorCode.WORD_REPLACEMENT_FAILED);
  }
}

interface PendingReplacement {
  s: Suggestion;
  matches: Word.RangeCollection;
  occIdx: number;
}

/**
 * Replaces multiple suggestions in one operation for better performance.
 */
export async function replaceSuggestionsTextBatch(suggestions: Suggestion[]): Promise<string[]> {
  const fixableSuggestions = suggestions.filter((s) => s.autoFixable !== false && s.selectedReplacement);
  if (!fixableSuggestions.length) return [];

  try {
    const word = getWordApi();
    const appliedIds: string[] = [];
    const grouped = groupSuggestionsByParagraph(
      [...fixableSuggestions].sort((a, b) => {
        if (a.paragraphIndex !== b.paragraphIndex) return a.paragraphIndex - b.paragraphIndex;
        // Replace backwards in the same paragraph to preserve offsets
        return b.offset - a.offset;
      })
    );

    await word.run(async (context) => {
      const paragraphs = context.document.body.paragraphs;
      paragraphs.load("items");
      await context.sync();

      for (const [pIdx, pSuggestions] of Array.from(grouped)) {
        const paragraph = paragraphs.items[pIdx];
        if (!paragraph) continue;

        const pending: PendingReplacement[] = [];
        for (const s of pSuggestions) {
          const original = s.paragraphText.slice(s.offset, s.offset + s.length);
          if (!isValidWordSearchText(original)) continue;
          const matches = paragraph.search(original, { matchCase: true, matchWholeWord: false });
          matches.load("items");
          pending.push({ s, matches, occIdx: countOccurrencesBefore(s.paragraphText, original, s.offset) });
        }

        await context.sync();

        for (const { matches, occIdx, s } of pending) {
          const target = matches.items[occIdx] || matches.items[0];
          if (target) {
            target.font.highlightColor = null as any;
            target.insertText(s.selectedReplacement!, word.InsertLocation.replace);
            appliedIds.push(s.id);
          }
        }
      }
      await context.sync();
    });

    return appliedIds;
  } catch (error) {
    return handleServiceError(error, ErrorCode.WORD_REPLACEMENT_FAILED);
  }
}

