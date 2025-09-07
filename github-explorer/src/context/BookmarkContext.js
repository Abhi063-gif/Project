import React, { createContext, useContext, useReducer, useEffect } from 'react';

const BookmarkContext = createContext();

const bookmarkReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_BOOKMARKS':
      return action.payload;
    case 'ADD_BOOKMARK':
      return [...state, { ...action.payload, dateAdded: new Date().toISOString() }];
    case 'REMOVE_BOOKMARK':
      return state.filter(bookmark => bookmark.id !== action.payload.id);
    case 'ADD_NOTE':
      return state.map(bookmark =>
        bookmark.id === action.payload.id
          ? { ...bookmark, note: action.payload.note }
          : bookmark
      );
    default:
      return state;
  }
};

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, dispatch] = useReducer(bookmarkReducer, []);

  useEffect(() => {
    const saved = localStorage.getItem('github-explorer-bookmarks');
    if (saved) {
      dispatch({ type: 'LOAD_BOOKMARKS', payload: JSON.parse(saved) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('github-explorer-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (repository) => {
    dispatch({ type: 'ADD_BOOKMARK', payload: repository });
  };

  const removeBookmark = (repository) => {
    dispatch({ type: 'REMOVE_BOOKMARK', payload: repository });
  };

  const isBookmarked = (repository) => {
    return bookmarks.some(bookmark => bookmark.id === repository.id);
  };

  const addNote = (repositoryId, note) => {
    dispatch({ type: 'ADD_NOTE', payload: { id: repositoryId, note } });
  };

  return (
    <BookmarkContext.Provider value={{
      bookmarks,
      addBookmark,
      removeBookmark,
      isBookmarked,
      addNote
    }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within BookmarkProvider');
  }
  return context;
};
