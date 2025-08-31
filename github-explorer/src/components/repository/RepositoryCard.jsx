import React from 'react';
import { Star, GitFork, Eye, Calendar } from 'lucide-react';
import { BookmarkButton } from './BookmarkButton';

export const RepositoryCard = ({ repository, onClick }) => {
  const {
    name,
    full_name,
    description,
    stargazers_count,
    forks_count,
    watchers_count,
    language,
    updated_at,
    owner
  } = repository;

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getLanguageColor = (lang) => {
    const colors = {
      javascript: 'from-yellow-400 to-yellow-600',
      python: 'from-blue-500 to-blue-700',
      java: 'from-red-500 to-red-700',
      typescript: 'from-blue-600 to-indigo-600',
      go: 'from-cyan-400 to-cyan-600',
      rust: 'from-orange-500 to-red-600',
    };
    return colors[lang?.toLowerCase()] || 'from-gray-400 to-gray-600';
  };

  return (
    <div className="group relative h-full">
      {/* Animated Border */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
      
      {/* Main Card */}
      <div 
        className="relative backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6 cursor-pointer border border-white/20 h-full flex flex-col transform hover:-translate-y-2 hover:scale-[1.02]"
        onClick={() => onClick(repository)}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3 flex-1">
            <div className="relative">
              <img
                src={owner.avatar_url}
                alt={owner.login}
                className="w-10 h-10 rounded-full ring-2 ring-white/50 shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
                {name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {owner.login}
              </p>
            </div>
          </div>
          <BookmarkButton repository={repository} />
        </div>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 mb-4 flex-1 line-clamp-3 text-sm leading-relaxed">
          {description || 'No description available'}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-yellow-500 transition-colors">
              <Star className="w-4 h-4 mr-1 fill-current" />
              {formatNumber(stargazers_count)}
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
              <GitFork className="w-4 h-4 mr-1" />
              {formatNumber(forks_count)}
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-green-500 transition-colors">
              <Eye className="w-4 h-4 mr-1" />
              {formatNumber(watchers_count)}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200/20">
          <div className="flex items-center space-x-2">
            {language && (
              <span className={`px-3 py-1 text-xs font-medium bg-gradient-to-r ${getLanguageColor(language)} text-white rounded-full shadow-lg`}>
                {language}
              </span>
            )}
          </div>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <Calendar className="w-3 h-3 mr-1" />
            {formatDate(updated_at)}
          </div>
        </div>
      </div>
    </div>
  );
};
