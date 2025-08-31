import React, { useState } from 'react';
import { useBookmarks } from '../context/BookmarkContext';
import { RepositoryCard } from '../components/repository/RepositoryCard';
import { SearchBar } from '../components/filters/SearchBar';
import { Trash2, FileText } from 'lucide-react';

export const Bookmarks = () => {
  const { bookmarks, removeBookmark, addNote } = useBookmarks();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [noteText, setNoteText] = useState('');

  const filteredBookmarks = bookmarks.filter(repo =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    repo.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRepositoryClick = (repository) => {
    window.open(repository.html_url, '_blank');
  };

  const handleAddNote = (repoId) => {
    addNote(repoId, noteText);
    setSelectedRepo(null);
    setNoteText('');
  };

  const openNoteModal = (repo) => {
    setSelectedRepo(repo);
    setNoteText(repo.note || '');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bookmarked Repositories</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Your saved repositories ({bookmarks.length})
          </p>
        </div>
      </div>

      {bookmarks.length > 0 && (
        <div className="max-w-md">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search bookmarks..."
          />
        </div>
      )}

      {filteredBookmarks.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
            {bookmarks.length === 0 ? 'No bookmarks yet' : 'No bookmarks found'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {bookmarks.length === 0 
              ? 'Start exploring repositories and bookmark the ones you find interesting'
              : 'Try adjusting your search query'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredBookmarks.map((repository) => (
            <div key={repository.id} className="relative">
              <RepositoryCard
                repository={repository}
                onClick={handleRepositoryClick}
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openNoteModal(repository);
                  }}
                  className="p-1.5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40"
                  title="Add note"
                >
                  <FileText className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeBookmark(repository);
                  }}
                  className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40"
                  title="Remove bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {repository.note && (
                <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">{repository.note}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Note Modal */}
      {selectedRepo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Add Note to {selectedRepo.name}
            </h3>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Add your notes about this repository..."
              className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setSelectedRepo(null)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAddNote(selectedRepo.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
