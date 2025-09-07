import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

export const SortControls = ({ sortBy, sortOrder, onSortChange, onOrderChange }) => {
  const sortOptions = [
    { value: 'stars', label: 'Stars' },
    { value: 'forks', label: 'Forks' },
    { value: 'updated', label: 'Updated' },
    { value: 'created', label: 'Created' }
  ];

  const toggleOrder = () => {
    onOrderChange(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  const getOrderIcon = () => {
    if (sortOrder === 'desc') return <ArrowDown className="w-4 h-4" />;
    if (sortOrder === 'asc') return <ArrowUp className="w-4 h-4" />;
    return <ArrowUpDown className="w-4 h-4" />;
  };

  return (
    <div className="flex space-x-2">
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="block px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            Sort by {option.label}
          </option>
        ))}
      </select>
      
      <button
        onClick={toggleOrder}
        className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        title={`Sort ${sortOrder === 'desc' ? 'Ascending' : 'Descending'}`}
      >
        {getOrderIcon()}
      </button>
    </div>
  );
};
