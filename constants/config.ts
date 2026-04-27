/**
 * Global configuration constants for the application.
 */

/** Endpoint for the LanguageTool API */
export const LANGUAGE_TOOL_ENDPOINT = "https://api.languagetool.org/v2/check";

/** Number of paragraphs to scan in a single batch */
export const SCAN_BATCH_SIZE = 100;

/** Number of suggestions to display per page in the taskpane */
export const SUGGESTIONS_PAGE_SIZE = 20;

/** Concurrent requests allowed for LanguageTool API */
export const LANGUAGE_TOOL_CONCURRENCY = 4;

/** Concurrent local checks allowed (usually tied to hardware capacity) */
export const LOCAL_SCAN_CONCURRENCY = 4;

/** Available languages for LanguageTool review */
export const SUPPORTED_LANGUAGES = [
  { value: "en-GB", label: "English (UK)" },
  { value: "en-US", label: "English (US)" },
  { value: "en-AU", label: "English (AU)" },
  { value: "en-CA", label: "English (CA)" },
];
