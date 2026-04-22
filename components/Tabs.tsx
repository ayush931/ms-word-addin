'use client';

import React from 'react';

interface TabsProps {
  activeFilter: string;
  counts: { all: number; spelling: number; grammar: number; style: number };
  onFilterChange: (filter: string) => void;
}

/**
 * Filter tabs to toggle between issue sections.
 */
export const Tabs: React.FC<TabsProps> = ({ activeFilter, counts, onFilterChange }) => {
  const filters = [
    { id: 'all', label: 'All', count: counts.all },
    { id: 'style', label: 'Style', count: counts.style },
    { id: 'spelling', label: 'Spelling', count: counts.spelling },
    { id: 'grammar', label: 'Grammar', count: counts.grammar },
    { id: 'stats', label: 'Stats', count: 0 },
  ];

  return (
    <nav className="tabs" aria-label="Suggestion filters">
      {filters.map((f) => (
        <button 
          key={f.id}
          className={`tab ${activeFilter === f.id ? 'active' : ''}`} 
          type="button" 
          onClick={() => onFilterChange(f.id)}
        >
          {f.label} <span>{f.count}</span>
        </button>
      ))}
    </nav>
  );
};
