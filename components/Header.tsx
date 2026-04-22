'use client';

import React from 'react';

interface HeaderProps {
  scanning: boolean;
  onScan: () => void;
}

/**
 * Header component with scan button.
 */
export const Header: React.FC<HeaderProps> = ({ scanning, onScan }) => {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Word review</p>
        <h1>Writing assistant</h1>
      </div>
      <button 
        className="scan-button" 
        type="button" 
        onClick={onScan}
        aria-busy={scanning}
      >
        <span className="scan-icon" aria-hidden="true"></span>
        <span>{scanning ? "Stop" : "Scan"}</span>
      </button>
    </header>
  );
};
