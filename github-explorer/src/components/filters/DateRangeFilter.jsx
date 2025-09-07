import React from 'react';
import { Calendar } from 'lucide-react';

export const DateRangeFilter = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
  };

  const presetRanges = [
    { label: 'Last 7 days', days: 7 },
    { label: 'Last 30 days', days: 30 },
    { label: 'Last 90 days', days: 90 },
    { label: 'Last year', days: 365 }
  ];

  const applyPreset = (days) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    
    onStartDateChange(start.toISOString());
    onEndDateChange(end.toISOString());
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Calendar className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Date Range</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">From</label>
          <input
            type="date"
            value={formatDate(startDate)}
            onChange={(e) => onStartDateChange(e.target.value ? new Date(e.target.value).toISOString() : '')}
            className="block w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">To</label>
          <input
            type="date"
            value={formatDate(endDate)}
            onChange={(e) => onEndDateChange(e.target.value ? new Date(e.target.value).toISOString() : '')}
            className="block w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {presetRanges.map((range) => (
          <button
            key={range.label}
            onClick={() => applyPreset(range.days)}
            className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
};
