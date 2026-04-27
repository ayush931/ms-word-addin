import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { Suggestion, ScanProgress } from "../types/suggestion";
import { ParagraphData, readParagraphs, setSuggestionHighlights } from "../services/word";
import { checkWithLanguageTool } from "../services/languagetool";
import { runLocalChecks, mergeSuggestions, runDocumentStyleChecks } from "../utils/checks";
import { mapWithConcurrency, yieldToBrowser } from "../utils/concurrency";
import { 
  SCAN_BATCH_SIZE, 
  LANGUAGE_TOOL_CONCURRENCY, 
  LOCAL_SCAN_CONCURRENCY 
} from "../constants/config";
import { getFriendlyErrorMessage } from "../utils/errors";

/**
 * Custom hook that manages the scanning state and process for the document.
 */
export function useScanner() {
  const mountedRef = useRef(false);
  const scanningRef = useRef(false);
  const shouldStopRef = useRef(false);
  const suggestionsRef = useRef<Suggestion[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState<ScanProgress | null>(null);
  const [status, setStatus] = useState("Open a Word document and scan.");
  const [latestId, setLatestId] = useState<string | null>(null);
  const [paragraphs, setParagraphs] = useState<ParagraphData[]>([]);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    suggestionsRef.current = suggestions;
  }, [suggestions]);

  useEffect(() => {
    scanningRef.current = scanning;
  }, [scanning]);

  const setIfMounted = useCallback(<T,>(
    setter: Dispatch<SetStateAction<T>>,
    value: SetStateAction<T>
  ) => {
    if (mountedRef.current) {
      setter(value);
    }
  }, []);

  const safeSetStatus = useCallback((value: SetStateAction<string>) => {
    setIfMounted(setStatus, value);
  }, [setIfMounted]);

  const safeSetSuggestions = useCallback((value: SetStateAction<Suggestion[]>) => {
    setIfMounted(setSuggestions, value);
  }, [setIfMounted]);

  const startScan = useCallback(async (onlineEnabled: boolean, language: string) => {
    if (scanningRef.current) return;
    scanningRef.current = true;
    shouldStopRef.current = false;

    setIfMounted<boolean>(setScanning, true);
    setIfMounted<ScanProgress | null>(setProgress, null);
    safeSetStatus("Reading document paragraphs...");

    try {
      // Clear old state
      await setSuggestionHighlights(suggestionsRef.current, null);
      safeSetSuggestions([]);
      setIfMounted<string | null>(setLatestId, null);

      const paragraphs: ParagraphData[] = await readParagraphs();
      setIfMounted(setParagraphs, paragraphs);
      const usable = paragraphs.filter((p) => p.text.trim().length > 0);

      if (!usable.length) {
        safeSetStatus("No text found in this document.");
        return;
      }

      setIfMounted<ScanProgress | null>(setProgress, { current: 0, total: usable.length });
      safeSetStatus(`Checking ${usable.length} paragraph${usable.length === 1 ? "" : "s"}...`);

      const allFound: Suggestion[] = [];
      const styleSuggestions = runDocumentStyleChecks(paragraphs, language);
      const concurrency = onlineEnabled ? LANGUAGE_TOOL_CONCURRENCY : LOCAL_SCAN_CONCURRENCY;

      // Process in batches to update UI and apply highlights progressively
      for (let i = 0; i < usable.length; i += SCAN_BATCH_SIZE) {
        if (shouldStopRef.current) {
          safeSetStatus("Scan stopped by user.");
          break;
        }
        const batch = usable.slice(i, i + SCAN_BATCH_SIZE);
        const batchParagraphIndexes = new Set(batch.map((para) => para.paragraphIndex));
        const batchStyleSuggestions = styleSuggestions.filter((s) => batchParagraphIndexes.has(s.paragraphIndex));
        
        const batchResults = await mapWithConcurrency(batch, concurrency, async (para) => {
          const local = runLocalChecks(para);
          const remote = onlineEnabled ? await checkWithLanguageTool(para, language) : [];
          const merged = mergeSuggestions(remote, local);
          
          setIfMounted<ScanProgress | null>(setProgress, prev => prev ? { ...prev, current: prev.current + 1 } : null);
          return merged;
        });

        const flatResults = [...batchStyleSuggestions, ...batchResults.flat()];
        if (flatResults.length > 0) {
          allFound.push(...flatResults);
          
          // Sort and update list
          const sorted = [...allFound].sort((a, b) => {
            if (a.paragraphIndex !== b.paragraphIndex) return a.paragraphIndex - b.paragraphIndex;
            return a.offset - b.offset;
          });
          
          safeSetSuggestions(sorted);
          setIfMounted<string | null>(setLatestId, flatResults[flatResults.length - 1].id);
          
          // Selection will be handled when user clicks an item, avoiding permanent highlights
        }
        
        await yieldToBrowser();
      }

      safeSetStatus(
        allFound.length
          ? `${allFound.length} suggestion${allFound.length === 1 ? "" : "s"} found and highlighted.`
          : "No grammar or spelling suggestions found."
      );
    } catch (error: any) {
      console.error("Scan failed", error);
      safeSetStatus(getFriendlyErrorMessage(error));
    } finally {
      scanningRef.current = false;
      setIfMounted<ScanProgress | null>(setProgress, null);
      setIfMounted<boolean>(setScanning, false);
    }
  }, [safeSetStatus, safeSetSuggestions, setIfMounted]);

  const stopScan = useCallback(() => {
    shouldStopRef.current = true;
  }, []);

  return {
    suggestions,
    setSuggestions: safeSetSuggestions,
    scanning,
    progress,
    status,
    setStatus: safeSetStatus,
    latestId,
    paragraphs,
    startScan,
    stopScan,
  };
}
