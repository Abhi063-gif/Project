import React from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useBookmarks } from '../../context/BookmarkContext';

export const BookmarkButton = ({ repository }) => {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const bookmarked = isBookmarked(repository);

  const toggle = (e) => {
    e.stopPropagation();
    bookmarked ? removeBookmark(repository) : addBookmark(repository);
  };

  return (
    <button
      aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
      title={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
      onClick={toggle}
      className={`p-2 rounded-full transition-colors ${
        bookmarked
          ? 'text-yellow-600 hover:text-yellow-700 bg-yellow-50 dark:bg-yellow-900/20'
          : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      {bookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
    </button>
  );
};

