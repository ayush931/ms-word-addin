export enum ErrorCode {
  WORD_NOT_FOUND = "WORD_NOT_FOUND",
  WORD_SYNC_FAILED = "WORD_SYNC_FAILED",
  WORD_SELECTION_FAILED = "WORD_SELECTION_FAILED",
  WORD_REPLACEMENT_FAILED = "WORD_REPLACEMENT_FAILED",
  PARAGRAPH_CHANGED = "PARAGRAPH_CHANGED",
  LANGUAGETOOL_API_ERROR = "LANGUAGETOOL_API_ERROR",
  LANGUAGETOOL_OFFLINE = "LANGUAGETOOL_OFFLINE",
  UNEXPECTED_ERROR = "UNEXPECTED_ERROR",
  MANUAL_REVIEW_REQUIRED = "MANUAL_REVIEW_REQUIRED",
}

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly originalError?: any;
  public readonly isOperational: boolean;

  constructor(code: ErrorCode, message: string, originalError?: any, isOperational = true) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.originalError = originalError;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function handleServiceError(error: any, defaultCode: ErrorCode = ErrorCode.UNEXPECTED_ERROR): never {
  if (error instanceof AppError) {
    throw error;
  }

  // Handle Office/Word specific errors
  if (error.name === "OfficeExtension.Error") {
    throw new AppError(
      ErrorCode.WORD_SYNC_FAILED,
      "Word failed to sync. The document may have changed or is no longer accessible.",
      error
    );
  }

  // Handle network errors
  if (error instanceof TypeError && error.message === "Failed to fetch") {
    throw new AppError(
      ErrorCode.LANGUAGETOOL_OFFLINE,
      "Unable to reach the grammar service. Please check your internet connection.",
      error
    );
  }

  const message = error instanceof Error ? error.message : String(error);
  throw new AppError(defaultCode, message, error);
}

export function getFriendlyErrorMessage(error: any): string {
  if (error instanceof AppError) {
    return error.message;
  }
  
  if (typeof error === "string") {
    return error;
  }

  return error?.message || "An unexpected error occurred.";
}
