import React from 'react';
import { Star, GitFork, Eye, Code2, Calendar, Users, ExternalLink } from 'lucide-react';
import { formatNumber, formatDate, formatLanguageColor } from '../../utils/formatters';

export const RepositoryDetails = ({ repository, onClose }) => {
  if (!repository) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <img
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {repository.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  by {repository.owner.login}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {repository.description || 'No description available'}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Stars</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {formatNumber(repository.stargazers_count)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center">
                <GitFork className="w-5 h-5 text-blue-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Forks</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {formatNumber(repository.forks_count)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center">
                <Eye className="w-5 h-5 text-green-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Watchers</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {formatNumber(repository.watchers_count)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center">
                <Code2 className="w-5 h-5 text-purple-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Issues</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {repository.open_issues_count}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Repository Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Language:</span>
                  <div className="flex items-center">
                    {repository.language && (
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: formatLanguageColor(repository.language) }}
                      />
                    )}
                    <span className="text-gray-900 dark:text-white font-medium">
                      {repository.language || 'Not specified'}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Size:</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {formatNumber(repository.size)} KB
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">License:</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {repository.license?.name || 'No license'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Default Branch:</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {repository.default_branch}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Timeline
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Created</p>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {formatDate(repository.created_at)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Last Updated</p>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {formatDate(repository.updated_at)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Code2 className="w-4 h-4 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Last Push</p>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {formatDate(repository.pushed_at)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Topics */}
          {repository.topics && repository.topics.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {repository.topics.map((topic) => (
                  <span
                    key={topic}
                    className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-4">
            <a
              href={repository.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View on GitHub
            </a>
            <a
              href={repository.clone_url}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Clone Repository
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
