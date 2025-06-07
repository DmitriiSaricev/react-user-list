import React from 'react';
import { FiltersProps } from './Filters.types';

const Filters: React.FC<FiltersProps> = ({ search, onSearchChange, sort, onSortChange }) => {
  return (
    <section className='mx-auto mb-8 w-full max-w-4xl'>
      <h2 className='mb-2 text-lg font-semibold text-gray-800'>Filter users</h2>
      <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
        <input
          type='text'
          placeholder='Search by name or email...'
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-400 transition focus:ring-2 focus:ring-blue-500 focus:outline-none sm:w-2/3 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-gray-500'
        />

        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 transition focus:ring-2 focus:ring-blue-500 focus:outline-none sm:w-1/3 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white'
        >
          <option value='name-asc'>Name (A–Z)</option>
          <option value='name-desc'>Name (Z–A)</option>
          <option value='email-asc'>Email (A–Z)</option>
          <option value='email-desc'>Email (Z–A)</option>
        </select>
      </div>
    </section>
  );
};

export default Filters;
