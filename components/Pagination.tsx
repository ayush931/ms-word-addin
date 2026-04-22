'use client';

import React from 'react';

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  totalCount: number;
  visibleCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

/**
 * Pagination controls for the suggestion list.
 */
export const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  pageCount, 
  totalCount, 
  visibleCount,
  pageSize,
  onPageChange 
}) => {
  if (totalCount <= pageSize) return null;

  const startIdx = (currentPage - 1) * pageSize + 1;
  const endIdx = Math.min(currentPage * pageSize, totalCount);

  return (
    <section className="pagination" aria-label="Suggestion pages">
      <button 
        className="action reject" 
        type="button" 
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      <span id="pageInfo">
        Page {currentPage}/{pageCount} • {startIdx}-{endIdx} of {totalCount}
      </span>
      <button 
        className="action reject" 
        type="button" 
        disabled={currentPage >= pageCount}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </section>
  );
};
