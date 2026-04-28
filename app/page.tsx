'use client';

import { useEffect, useState, useMemo, useCallback, useRef } from 'react';

// Components
import { Header } from '../components/Header';
import { ScorePanel } from '../components/ScorePanel';
import { Tabs } from '../components/Tabs';
import { Pagination } from '../components/Pagination';
import { SuggestionList } from '../components/SuggestionList';
import { Settings } from '../components/Settings';
import { StatsPanel } from '../components/StatsPanel';

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

const STATIC_BULK_RULES = [
  { ruleId: "tf-uk-ize-spelling", label: "UK -ize style" },
  { ruleId: "tf-serial-comma", label: "Serial comma" },
  { ruleId: "tf-uk-date-format", label: "UK dates" },
  { ruleId: "tf-quote-punctuation", label: "Quote punctuation" },
  { ruleId: "en-dash-range", label: "En dash ranges" },
  { ruleId: "em-dash-spacing", label: "Em dash spacing" },
  { ruleId: "em-dash-substitution", label: "Double hyphen to em dash" },
  { ruleId: "quotation-style", label: "Quotation style" },
  { ruleId: "smart-apostrophe", label: "Smart apostrophes" },
  { ruleId: "abbr-spacing", label: "Abbreviation spacing" },
  { ruleId: "seq", label: "Table and figure numbering" },
  { ruleId: "math-space", label: "Math operator spacing" },
  { ruleId: "local-typo", label: "Common typos" },
  { ruleId: "local-one-space", label: "Extra spaces" },
  { ruleId: "local-repeated-word", label: "Repeated words" },
  { ruleId: "local-pronoun-i", label: "Lowercase pronoun I" },
  { ruleId: "local-space-before-punctuation", label: "Space before punctuation" },
  { ruleId: "local-repeated-punctuation", label: "Repeated punctuation" },
  { ruleId: "local-space-after-punctuation", label: "Space after punctuation" },
  { ruleId: "local-space-after-period", label: "Space after period" },
];

function getNonOverlappingSuggestions(suggestions: Suggestion[]) {
  const accepted: Suggestion[] = [];
  const occupiedByParagraph = new Map<number, Array<{ start: number; end: number }>>();

  [...suggestions]
    .sort((a, b) => {
      if (a.paragraphIndex !== b.paragraphIndex) return a.paragraphIndex - b.paragraphIndex;
      if (a.offset !== b.offset) return a.offset - b.offset;
      return a.length - b.length;
    })
    .forEach((suggestion) => {
      const ranges = occupiedByParagraph.get(suggestion.paragraphIndex) || [];
      const start = suggestion.offset;
      const end = suggestion.offset + suggestion.length;
      if (ranges.some((range) => start < range.end && end > range.start)) return;

      ranges.push({ start, end });
      occupiedByParagraph.set(suggestion.paragraphIndex, ranges);
      accepted.push(suggestion);
    });

  return accepted;
}

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
    paragraphs,
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
  const [language, setLanguage] = useState("en-GB");
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
  const bulkIssueCounts = useMemo(() => {
    return STATIC_BULK_RULES.reduce<Record<string, number>>((acc, action) => {
      acc[action.ruleId] = suggestions.filter(
        (s) => s.ruleId === action.ruleId && s.autoFixable !== false && s.selectedReplacement
      ).length;
      return acc;
    }, {});
  }, [suggestions]);
  const staticFixableSuggestions = useMemo(() => {
    const staticRuleIds = new Set(STATIC_BULK_RULES.map((action) => action.ruleId));
    return getNonOverlappingSuggestions(
      suggestions.filter(
        (s) => s.ruleId && staticRuleIds.has(s.ruleId) && s.autoFixable !== false && s.selectedReplacement
      )
    );
  }, [suggestions]);

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
      const appliedIds = new Set(await replaceSuggestionsTextBatch(fixableSuggestions));
      setSuggestions(prev => prev.filter(s => !appliedIds.has(s.id)));
      setStatus(
        appliedIds.size === fixableSuggestions.length
          ? "Batch update complete."
          : `Applied ${appliedIds.size} of ${fixableSuggestions.length}. Scan again for any changed text.`
      );
    } catch (err: any) {
      setStatus(getFriendlyErrorMessage(err));
    }
  }, [visibleSuggestions, setSuggestions, setStatus]);

  const handleAcceptIssueType = useCallback(async (ruleId: string) => {
    const fixableSuggestions = suggestionsRef.current.filter(
      (s) => s.ruleId === ruleId && s.autoFixable !== false && s.selectedReplacement
    );
    if (!fixableSuggestions.length) return;

    try {
      setStatus(`Processing ${fixableSuggestions.length} ${fixableSuggestions.length === 1 ? "issue" : "issues"}...`);
      const appliedIds = new Set(await replaceSuggestionsTextBatch(fixableSuggestions));
      setSuggestions(prev => prev.filter(s => !appliedIds.has(s.id)));
      setStatus(
        appliedIds.size === fixableSuggestions.length
          ? "Accept all complete."
          : `Applied ${appliedIds.size} of ${fixableSuggestions.length}. Scan again for any changed text.`
      );
    } catch (err: any) {
      setStatus(getFriendlyErrorMessage(err));
    }
  }, [setSuggestions, setStatus]);

  const handleAcceptStaticFixes = useCallback(async () => {
    const staticRuleIds = new Set(STATIC_BULK_RULES.map((action) => action.ruleId));
    const fixableSuggestions = getNonOverlappingSuggestions(
      suggestionsRef.current.filter(
        (s) => s.ruleId && staticRuleIds.has(s.ruleId) && s.autoFixable !== false && s.selectedReplacement
      )
    );
    if (!fixableSuggestions.length) return;

    try {
      setStatus(`Processing ${fixableSuggestions.length} static ${fixableSuggestions.length === 1 ? "fix" : "fixes"}...`);
      const appliedIds = new Set(await replaceSuggestionsTextBatch(fixableSuggestions));
      setSuggestions(prev => prev.filter(s => !appliedIds.has(s.id)));
      setStatus(
        appliedIds.size === fixableSuggestions.length
          ? "All static fixes applied."
          : `Applied ${appliedIds.size} of ${fixableSuggestions.length}. Scan again for any changed text.`
      );
    } catch (err: any) {
      setStatus(getFriendlyErrorMessage(err));
    }
  }, [setSuggestions, setStatus]);

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

      {activeFilter === 'stats' ? (
        <StatsPanel 
          paragraphs={paragraphs} 
          onStatusChange={setStatus} 
        />
      ) : activeFilter === 'acceptAll' ? (
        <section className="accept-all-page" aria-label="Accept all by issue">
          <div className="accept-all-header">
            <strong>Accept all fixes</strong>
            <span>Apply deterministic fix groups across the document.</span>
          </div>
          <button
            className="accept-all-primary"
            type="button"
            disabled={staticFixableSuggestions.length === 0 || scanning}
            onClick={handleAcceptStaticFixes}
          >
            <span>Accept all static fixes</span>
            <strong>{staticFixableSuggestions.length}</strong>
          </button>
          <div className="accept-all-list">
            {STATIC_BULK_RULES.map((action) => {
              const count = bulkIssueCounts[action.ruleId] || 0;
              return (
                <button
                  key={action.ruleId}
                  className="accept-all-item"
                  type="button"
                  disabled={count === 0 || scanning}
                  onClick={() => handleAcceptIssueType(action.ruleId)}
                >
                  <span>{action.label}</span>
                  <strong>{count}</strong>
                </button>
              );
            })}
          </div>
        </section>
      ) : (
        <>
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
        </>
      )}

      <Settings
        onlineEnabled={onlineEnabled}
        onOnlineToggle={setOnlineEnabled}
        language={language}
        onLanguageChange={setLanguage}
      />
    </main>
  );
}
