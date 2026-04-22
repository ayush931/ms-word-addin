'use client';

import React from 'react';
import { SUPPORTED_LANGUAGES } from '../constants/config';

interface SettingsProps {
  onlineEnabled: boolean;
  onOnlineToggle: (enabled: boolean) => void;
  language: string;
  onLanguageChange: (language: string) => void;
}

/**
 * Footer settings for online checking and language preference.
 */
export const Settings: React.FC<SettingsProps> = ({
  onlineEnabled,
  onOnlineToggle,
  language,
  onLanguageChange,
}) => {
  return (
    <footer className="settings">
      <label className="toggle">
        <input 
          type="checkbox" 
          checked={onlineEnabled} 
          onChange={(e) => onOnlineToggle(e.target.checked)} 
        />
        <span>LanguageTool</span>
      </label>
      <select 
        value={language} 
        onChange={(e) => onLanguageChange(e.target.value)} 
        aria-label="Language"
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </footer>
  );
};
