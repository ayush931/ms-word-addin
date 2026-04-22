'use client';

import React, { useState, useEffect } from 'react';
import { ParagraphLike } from '../utils/checks';
import { replaceSuggestionText } from '../services/word';
import { Suggestion } from '../types/suggestion';

interface StatsPanelProps {
  paragraphs: ParagraphLike[];
  onStatusChange: (status: string) => void;
}

interface SectionStat {
  name: string;
  text: string;
  alphabetCount: number;
  wordCount: number;
  paragraphIndex: number;
}

/**
 * Panel for document stats and header rewriting.
 */
export const StatsPanel: React.FC<StatsPanelProps> = ({ paragraphs, onStatusChange }) => {
  const [sections, setSections] = useState<SectionStat[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const countAlphabets = (text: string) => (text.match(/[a-zA-Z]/g) || []).length;
  const countWords = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

  // Global document stats
  const totalAlphabets = paragraphs.reduce((acc, p) => acc + countAlphabets(p.text), 0);
  const totalWords = paragraphs.reduce((acc, p) => acc + countWords(p.text), 0);

  useEffect(() => {
    const stats: SectionStat[] = [];
    
    // Find first few potential headers (excluding potential abstract)
    for (let i = 0; i < Math.min(5, paragraphs.length); i++) {
      const text = paragraphs[i].text.trim();
      if (text && text.length < 300 && !/^abstract:?$/i.test(text)) {
        stats.push({
          name: i === 0 ? "Title" : `Header ${i}`,
          text: text,
          alphabetCount: countAlphabets(text),
          wordCount: countWords(text),
          paragraphIndex: i
        });
      }
    }
    setSections(stats);
  }, [paragraphs]);

  const handleRewrite = async (index: number) => {
    const section = sections[index];
    try {
      onStatusChange("Updating document...");
      
      const dummySuggestion: Suggestion = {
        id: 'rewrite-' + Date.now(),
        paragraphIndex: section.paragraphIndex,
        paragraphText: paragraphs[section.paragraphIndex].text,
        offset: 0,
        length: paragraphs[section.paragraphIndex].text.length,
        type: 'style',
        message: 'Manual rewrite',
        replacements: [editText],
        selectedReplacement: editText,
        source: 'Stats',
        autoFixable: true
      };

      await replaceSuggestionText(dummySuggestion);
      onStatusChange("Section updated.");
      setEditingIndex(null);
      
      const newSections = [...sections];
      newSections[index].text = editText;
      newSections[index].alphabetCount = countAlphabets(editText);
      newSections[index].wordCount = countWords(editText);
      setSections(newSections);
    } catch (err) {
      onStatusChange("Failed to update section.");
    }
  };

  return (
    <div className="stats-container">
      <div className="global-stats">
        <div className="stat-item">
          <span className="stat-label">Total Alphabets</span>
          <span className="stat-value">{totalAlphabets}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Total Words</span>
          <span className="stat-value">{totalWords}</span>
        </div>
      </div>

      <div className="section-list">
        {sections.map((section, idx) => (
          <div key={idx} className="section-card">
            <div className="section-header">
              <span className="section-name">{section.name}</span>
              <div className="section-badges">
                <span className="badge">{section.alphabetCount} A-Z</span>
                <span className="badge">{section.wordCount} words</span>
              </div>
            </div>
            
            {editingIndex === idx ? (
              <div className="edit-area">
                <textarea 
                  className="rewrite-input"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  rows={3}
                />
                <div className="edit-actions">
                  <button className="btn-save" onClick={() => handleRewrite(idx)}>Apply</button>
                  <button className="btn-cancel" onClick={() => setEditingIndex(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className="preview-row">
                <p className="section-preview">{section.text}</p>
                <button className="btn-edit-small" onClick={() => { setEditingIndex(idx); setEditText(section.text); }}>Rewrite</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .stats-container { padding: 12px; display: flex; flex-direction: column; gap: 16px; }
        .global-stats { 
          display: grid; grid-template-columns: 1fr 1fr; gap: 12px; 
          background: #f8f9fa; padding: 12px; border-radius: 8px; border: 1px solid #e9ecef;
        }
        .stat-item { display: flex; flex-direction: column; align-items: center; }
        .stat-label { font-size: 11px; color: #6c757d; text-transform: uppercase; letter-spacing: 0.5px; }
        .stat-value { font-size: 20px; font-weight: 700; color: #212529; }
        
        .section-list { display: flex; flex-direction: column; gap: 10px; }
        .section-card { 
          background: #fff; border: 1px solid #dee2e6; border-radius: 6px; padding: 10px;
        }
        .section-header { 
          display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;
        }
        .section-name { font-weight: 600; color: #495057; font-size: 12px; }
        .section-badges { display: flex; gap: 6px; }
        .badge { 
          font-size: 10px; background: #e7f1ff; color: #0078d4; padding: 2px 6px; border-radius: 10px; font-weight: 500;
        }
        .preview-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; }
        .section-preview { font-size: 13px; color: #495057; line-height: 1.4; margin: 0; flex: 1; }
        .btn-edit-small { 
          background: none; border: 1px solid #0078d4; color: #0078d4; padding: 2px 8px; 
          border-radius: 4px; font-size: 11px; cursor: pointer; white-space: nowrap;
        }
        .btn-edit-small:hover { background: #f0f7ff; }
        
        .rewrite-input { 
          width: 100%; font-family: inherit; font-size: 13px; padding: 6px;
          border: 1px solid #0078d4; border-radius: 4px; resize: vertical; margin-bottom: 6px;
        }
        .edit-actions { display: flex; gap: 6px; }
        .btn-save { 
          background: #0078d4; color: #fff; border: none; padding: 4px 12px; border-radius: 4px; cursor: pointer; font-size: 11px;
        }
        .btn-cancel { 
          background: #fff; border: 1px solid #ced4da; padding: 4px 12px; border-radius: 4px; cursor: pointer; font-size: 11px;
        }
      `}</style>
    </div>
  );
};
