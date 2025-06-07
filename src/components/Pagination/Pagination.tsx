import React from 'react';
import { PaginationProps } from './Pagination.types';

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className='mt-10 flex flex-wrap items-center justify-center gap-2 pb-10 text-sm'
      aria-label='Pagination Navigation'
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='rounded-lg bg-zinc-200 px-4 py-2 text-gray-800 transition hover:bg-zinc-300 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-600'
      >
        Prev
      </button>

      {pages.map((page) => {
        const isActive = currentPage === page;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={isActive ? 'page' : undefined}
            className={`rounded-lg border px-4 py-2 font-medium transition ${
              isActive
                ? 'border-blue-600 bg-blue-600 text-white shadow-md'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700'
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='rounded-lg bg-zinc-200 px-4 py-2 text-gray-800 transition hover:bg-zinc-300 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-600'
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
