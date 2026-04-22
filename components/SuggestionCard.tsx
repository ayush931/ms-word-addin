'use client';

import React from 'react';
import { Suggestion } from '../types/suggestion';

interface SuggestionCardProps {
  suggestion: Suggestion;
  isNew: boolean;
  onAccept: (id: string) => void;
  onDismiss: (id: string) => void;
  onFocusSuggestion: (id: string) => void;
  onSelectReplacement: (id: string, replacement: string) => void;
}

/**
 * Displays a single suggestion with context, message, and action buttons.
 */
export const SuggestionCard = React.memo<SuggestionCardProps>(({ 
  suggestion, 
  isNew, 
  onAccept, 
  onDismiss,
  onFocusSuggestion,
  onSelectReplacement
}) => {
  const canAutoFix = suggestion.autoFixable !== false && suggestion.selectedReplacement;

  return (
    <article
      className={`suggestion-card ${isNew ? 'new' : ''}`}
      role="button"
      tabIndex={0}
      onClick={() => onFocusSuggestion(suggestion.id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onFocusSuggestion(suggestion.id);
        }
      }}
    >
      <div className="suggestion-meta">
        <span className={`badge ${suggestion.type}`}>
          {suggestion.type.charAt(0).toUpperCase() + suggestion.type.slice(1)}
        </span>
        <span>Paragraph {suggestion.paragraphIndex + 1}</span>
      </div>
      
      <p className="context">
        <SuggestionContext suggestion={suggestion} />
      </p>
      
      <p className="message">{suggestion.message}</p>
      
      {canAutoFix ? (
        <div className="replacement-row">
          {suggestion.replacements.slice(0, 4).map((replacement, idx) => (
            <button 
              key={idx} 
              className="replacement" 
              type="button" 
              onClick={(event) => {
                event.stopPropagation();
                onSelectReplacement(suggestion.id, replacement);
              }}
            >
              {replacement}
            </button>
          ))}
        </div>
      ) : (
        <p className="manual-review">Manual review required</p>
      )}
      
      <div className="actions">
        <button 
          className="action accept" 
          type="button" 
          disabled={!canAutoFix}
          onClick={(event) => {
            event.stopPropagation();
            onAccept(suggestion.id);
          }}
        >
          Fix
        </button>
        <button 
          className="action reject" 
          type="button" 
          onClick={(event) => {
            event.stopPropagation();
            onDismiss(suggestion.id);
          }}
        >
          Reject
        </button>
      </div>
    </article>
  );
});

/**
 * Inline helper to render the context snippet with the error highlighted.
 */
const SuggestionContext: React.FC<{ suggestion: Suggestion }> = ({ suggestion }) => {
  const text = suggestion.paragraphText;
  const start = Math.max(0, suggestion.offset - 55);
  const end = Math.min(text.length, suggestion.offset + suggestion.length + 55);
  const before = text.slice(start, suggestion.offset);
  const wrong = text.slice(suggestion.offset, suggestion.offset + suggestion.length);
  const after = text.slice(suggestion.offset + suggestion.length, end);

  return (
    <>
      {start > 0 && "..."}
      {before}
      <span className="highlight">{wrong}</span>
      {after}
      {end < text.length && "..."}
    </>
  );
};
