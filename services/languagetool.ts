import { LANGUAGE_TOOL_ENDPOINT } from "../constants/config";
import { Suggestion } from "../types/suggestion";
import { AppError, ErrorCode, handleServiceError } from "../utils/errors";

/**
 * Communicates with the LanguageTool API for advanced grammar and spelling checks.
 */
export async function checkWithLanguageTool(
  paragraph: { text: string; paragraphIndex: number },
  language: string
): Promise<Suggestion[]> {
  try {
    const body = new URLSearchParams({
      text: paragraph.text,
      language: language,
      enabledOnly: "false",
    });

    const response = await fetch(LANGUAGE_TOOL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    if (!response.ok) {
      throw new AppError(
        ErrorCode.LANGUAGETOOL_API_ERROR,
        `LanguageTool API responded with status ${response.status}`
      );
    }

    const data = await response.json();

    return data.matches.map((match: any): Suggestion => ({
      id: Math.random().toString(36).substring(2, 11),
      paragraphIndex: paragraph.paragraphIndex,
      paragraphText: paragraph.text,
      offset: match.offset,
      length: match.length,
      type: isSpellingIssue(match) ? "spelling" : "grammar",
      message: match.message || "Review this text.",
      replacements: match.replacements?.slice(0, 4).map((item: any) => item.value).filter(Boolean) || [],
      selectedReplacement: match.replacements?.[0]?.value || "",
      source: "LanguageTool",
    }));
  } catch (error) {
    if (error instanceof AppError) {
      // Re-throw if it's already an AppError (like the API error above)
      // Or we can return [] to allow local checks to still work
      console.warn("LanguageTool API error:", error.message);
      return [];
    }
    
    // For network errors or unexpected errors, we handle them but return empty suggestions
    // to allow the scan to continue with local checks.
    try {
      handleServiceError(error, ErrorCode.LANGUAGETOOL_OFFLINE);
    } catch (e: any) {
      console.warn("LanguageTool scan skipped:", e.message);
    }
    return [];
  }
}

/**
 * Heuristic to determine if a LanguageTool match is a spelling error.
 */
function isSpellingIssue(match: any): boolean {
  const category = (match.rule?.category?.id || "").toUpperCase();
  const issueType = match.rule?.issueType || "";
  return category.includes("TYPOS") || issueType === "misspelling";
}
