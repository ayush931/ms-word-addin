'use client';

import React from 'react';
import { ScanProgress } from '../types/suggestion';

interface ScorePanelProps {
  score: number | string;
  statusText: string;
  scanning: boolean;
  progress: ScanProgress | null;
}

/**
 * Displays the writing score and document scanning progress.
 */
export const ScorePanel: React.FC<ScorePanelProps> = ({ score, statusText, scanning, progress }) => {
  const needsReview = typeof score === 'number' && score < 100;

  return (
    <section className="score-panel" aria-label="Writing score">
      <div className="score-ring">
        <span>{scanning ? "..." : score}</span>
      </div>
      <div className="score-copy">
        <strong>
          {scanning ? "Scanning" : (needsReview ? "Needs review" : "Ready")}
        </strong>
        <span>{statusText}</span>
        
        {scanning && progress && (
          <div className="scan-progress" aria-live="polite">
            <div className="scan-progress-row">
              <span>{progress.current} of {progress.total} paragraphs scanned</span>
              <span>{Math.round((progress.current / progress.total) * 100)}%</span>
            </div>
            <div className="scan-progress-track" aria-hidden="true">
              <div 
                className="scan-progress-bar" 
                style={{ width: `${(progress.current / progress.total) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
