'use client';

import { useEffect, useState, useMemo, useCallback, useRef } from 'react';

// Components
import { Header } from '../components/Header';
import { ScorePanel } from '../components/ScorePanel';
import { Tabs } from '../components/Tabs';
import { Pagination } from '../components/Pagination';
import { SuggestionList } from '../components/SuggestionList';
import { Settings } from '../components/Settings';

// Hooks & Services
import { useScanner } from '../hooks/useScanner';
import {
  replaceSuggestionText,
  replaceSuggestionsTextBatch,
  selectSuggestionText,
  setSuggestionHighlights
} from '../services/word';

// Constants & Types
import { SUGGESTIONS_PAGE_SIZE } from '../constants/config';
import { Suggestion } from '../types/suggestion';
import { getFriendlyErrorMessage } from '../utils/errors';

/**
 * Main Taskpane Entry Point.
 * Manages global state and orchestrates components.
 */
export default function WritingAssistant() {
  const {
    suggestions,
    setSuggestions,
    scanning,
    progress,
    status,
    setStatus,
    latestId,
    startScan,
    stopScan,
  } = useScanner();

  // Ref to keep suggestions stable for callbacks
  const suggestionsRef = useRef(suggestions);
  useEffect(() => {
    suggestionsRef.current = suggestions;
  }, [suggestions]);

  // Local UI state
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [onlineEnabled, setOnlineEnabled] = useState(true);
  const [language, setLanguage] = useState("en-US");
  const autoScanStartedRef = useRef(false);

  // Initialize Office
  useEffect(() => {
    let cancelled = false;
    const office = (globalThis as { Office?: { onReady?: (cb: () => void) => void } }).Office;
    if (!office?.onReady) {
      setStatus("Office runtime not detected.");
      return () => {
        cancelled = true;
      };
    }

    office.onReady(() => {
      if (cancelled) return;
      const hasWordHost = typeof (globalThis as { Word?: unknown }).Word !== 'undefined';
      setStatus("Document connection active. Ready to scan.");
      if (!hasWordHost) {
        setStatus("Open this add-in in Word to scan a document.");
        return;
      }

      if (autoScanStartedRef.current) return;
      autoScanStartedRef.current = true;

      // Auto-start once on load only when the Word host is available.
      void startScan(onlineEnabled, language);
    });

    return () => {
      cancelled = true;
    };
  }, [language, onlineEnabled, setStatus, startScan]);

  // --- Computed State ---

  const filteredSuggestions = useMemo(() => {
    return suggestions.filter((s) => activeFilter === 'all' || s.type === activeFilter);
  }, [suggestions, activeFilter]);

  const counts = useMemo(() => {
    return suggestions.reduce(
      (acc, s) => {
        acc.all += 1;
        if (s.type === 'style') acc.style += 1;
        if (s.type === 'spelling') acc.spelling += 1;
        if (s.type === 'grammar') acc.grammar += 1;
        return acc;
      },
      { all: 0, style: 0, spelling: 0, grammar: 0 }
    );
  }, [suggestions]);

  const visibleSuggestions = useMemo(() => {
    const start = (currentPage - 1) * SUGGESTIONS_PAGE_SIZE;
    return filteredSuggestions.slice(start, start + SUGGESTIONS_PAGE_SIZE);
  }, [filteredSuggestions, currentPage]);
  const visibleFixableCount = useMemo(
    () => visibleSuggestions.filter((s) => s.autoFixable !== false && s.selectedReplacement).length,
    [visibleSuggestions]
  );

  const pageCount = Math.max(1, Math.ceil(filteredSuggestions.length / SUGGESTIONS_PAGE_SIZE));
  const score = suggestions.length ? Math.max(0, 100 - counts.all * 7) : "--";

  // Reset pagination when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  // --- Handlers ---

  const handleAccept = useCallback(async (id: string, replacement?: string) => {
    const suggestion = suggestionsRef.current.find((s) => s.id === id);
    if (!suggestion) return;
    if (suggestion.autoFixable === false) {
      setStatus("This issue needs manual review.");
      return;
    }

    const suggestionToApply = replacement
      ? { ...suggestion, selectedReplacement: replacement }
      : suggestion;

    try {
      setStatus("Applying change...");
      await replaceSuggestionText(suggestionToApply);
      setSuggestions(prev => prev.filter(s => s.id !== id));
      setStatus("Change applied successfully.");
    } catch (err: any) {
      setStatus(getFriendlyErrorMessage(err));
    }
  }, [setSuggestions, setStatus]);

  const handleDismiss = useCallback(async (id: string) => {
    const suggestion = suggestionsRef.current.find((s) => s.id === id);
    if (suggestion) {
      await setSuggestionHighlights([suggestion], null);
    }
    setSuggestions(prev => prev.filter(s => s.id !== id));
  }, [setSuggestions]);

  const handleSelectReplacement = useCallback((id: string, replacement: string) => {
    setSuggestions(prev => prev.map(s => s.id === id ? { ...s, selectedReplacement: replacement } : s));
    void handleAccept(id, replacement);
  }, [setSuggestions, handleAccept]);

  const handleAcceptVisible = useCallback(async () => {
    const fixableSuggestions = visibleSuggestions.filter((s) => s.autoFixable !== false && s.selectedReplacement);
    if (!fixableSuggestions.length) return;
    try {
      setStatus(`Processing ${fixableSuggestions.length} items...`);
      await replaceSuggestionsTextBatch(fixableSuggestions);
      const visibleIds = new Set(fixableSuggestions.map(s => s.id));
      setSuggestions(prev => prev.filter(s => !visibleIds.has(s.id)));
      setStatus("Batch update complete.");
    } catch (err: any) {
      setStatus(getFriendlyErrorMessage(err));
    }
  }, [visibleSuggestions, setSuggestions, setStatus]);

  const handleDismissVisible = useCallback(async () => {
    if (!visibleSuggestions.length) return;
    await setSuggestionHighlights(visibleSuggestions, null);
    const visibleIds = new Set(visibleSuggestions.map(s => s.id));
    setSuggestions(prev => prev.filter(s => !visibleIds.has(s.id)));
  }, [visibleSuggestions, setSuggestions]);

  const handleFocusSuggestion = useCallback(async (id: string) => {
    const suggestion = suggestionsRef.current.find((s) => s.id === id);
    if (!suggestion) return;

    try {
      await selectSuggestionText(suggestion);
      setStatus(`Selected issue in paragraph ${suggestion.paragraphIndex + 1}.`);
    } catch (err: any) {
      setStatus(getFriendlyErrorMessage(err));
    }
  }, [setStatus]);

  // --- Render ---

  return (
    <main className="app-shell">
      <Header
        scanning={scanning}
        onScan={scanning ? stopScan : () => startScan(onlineEnabled, language)}
      />

      <ScorePanel
        score={score}
        statusText={status}
        scanning={scanning}
        progress={progress}
      />

      <section className="quick-actions" aria-label="Suggestion actions">
        <button
          className="action accept"
          type="button"
          disabled={visibleFixableCount === 0 || scanning}
          onClick={handleAcceptVisible}
        >
          Fix visible
        </button>
        <button
          className="action reject"
          type="button"
          disabled={visibleSuggestions.length === 0 || scanning}
          onClick={handleDismissVisible}
        >
          Dismiss visible
        </button>
      </section>

      <Tabs
        activeFilter={activeFilter}
        counts={counts}
        onFilterChange={setActiveFilter}
      />

      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        totalCount={filteredSuggestions.length}
        visibleCount={visibleSuggestions.length}
        pageSize={SUGGESTIONS_PAGE_SIZE}
        onPageChange={setCurrentPage}
      />

      <SuggestionList
        suggestions={visibleSuggestions}
        scanning={scanning}
        latestId={latestId}
        onAccept={handleAccept}
        onDismiss={handleDismiss}
        onFocusSuggestion={handleFocusSuggestion}
        onSelectReplacement={handleSelectReplacement}
      />

      <Settings
        onlineEnabled={onlineEnabled}
        onOnlineToggle={setOnlineEnabled}
        language={language}
        onLanguageChange={setLanguage}
      />
    </main>
  );
}
