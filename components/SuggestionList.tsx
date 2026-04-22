'use client';

import React from 'react';
import { Suggestion } from '../types/suggestion';
import { SuggestionCard } from './SuggestionCard';

interface SuggestionListProps {
  suggestions: Suggestion[];
  scanning: boolean;
  latestId: string | null;
  onAccept: (id: string) => void;
  onDismiss: (id: string) => void;
  onFocusSuggestion: (id: string) => void;
  onSelectReplacement: (id: string, replacement: string) => void;
}

/**
 * Container for the list of suggestion cards.
 */
export const SuggestionList: React.FC<SuggestionListProps> = ({
  suggestions,
  scanning,
  latestId,
  onAccept,
  onDismiss,
  onFocusSuggestion,
  onSelectReplacement,
}) => {
  return (
    <section className="suggestions" aria-live="polite">
      {suggestions.map((s) => (
        <div key={s.id} data-id={s.id}>
          <SuggestionCard 
            suggestion={s}
            isNew={s.id === latestId}
            onAccept={onAccept}
            onDismiss={onDismiss}
            onFocusSuggestion={onFocusSuggestion}
            onSelectReplacement={onSelectReplacement}
          />
        </div>
      ))}

      {suggestions.length === 0 && !scanning && (
        <section className="empty-state">
          <div className="empty-mark" aria-hidden="true"></div>
          <strong>No suggestions</strong>
          <span>Scan the document to review the writing.</span>
        </section>
      )}
    </section>
  );
};
