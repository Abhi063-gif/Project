import React from 'react';
import { Search, X, Sparkles } from 'lucide-react';

export const SearchBar = ({ value, onChange, placeholder = "Search repositories..." }) => {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="relative group">
      {/* Animated Background */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      
      {/* Search Container */}
      <div className="relative backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 rounded-xl border border-white/20 shadow-lg">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 group-hover:text-purple-500 transition-colors duration-200" />
        </div>
        
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full pl-12 pr-12 py-4 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-0 text-lg font-medium"
          placeholder={placeholder}
        />
        
        {value && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-xl transition-colors"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-red-500 transition-colors" />
          </button>
        )}
        
        {/* Floating Animation */}
        {!value && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-30">
            <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
};
