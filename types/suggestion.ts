/**
 * Defines the type of suggestion.
 */
export type SuggestionType = 'spelling' | 'grammar' | 'style';

export type SuggestionSeverity = 'error' | 'warning';

/**
 * Represents a single writing suggestion with metadata.
 */
export interface Suggestion {
  /** Unique identifier for the suggestion */
  id: string;
  /** Index of the paragraph in the document (0-indexed) */
  paragraphIndex: number;
  /** The full original text of the paragraph */
  paragraphText: string;
  /** Starting character offset of the issue within the paragraph */
  offset: number;
  /** Length of the text that has the issue */
  length: number;
  /** Type of the issue (spelling or grammar) */
  type: SuggestionType;
  /** Rule family that produced the issue */
  ruleId?: string;
  /** Whether the issue is a confident error or a warning */
  severity?: SuggestionSeverity;
  /** Whether the suggestion can be applied automatically */
  autoFixable?: boolean;
  /** Human-readable explanation of the issue */
  message: string;
  /** Array of suggested replacement strings */
  replacements: string[];
  /** The currently chosen replacement string */
  selectedReplacement: string;
  /** Where the suggestion came from: 'Local' or 'LanguageTool' */
  source: string;
}

/**
 * Tracks the progress of a document scan.
 */
export interface ScanProgress {
  /** Number of paragraphs already scanned */
  current: number;
  /** Total number of paragraphs to scan */
  total: number;
}
