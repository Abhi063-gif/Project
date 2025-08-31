import { useState, useCallback } from 'react';
import { githubAPI } from '../services/gitHubAPI';

export const useGitHubAPI = () => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasMore: true
  });

  const searchRepositories = useCallback(async (query, filters = {}, append = false) => {
    if (!query.trim()) return;
    
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
      setRepositories([]); // Clear previous results
    }
    
    setError(null);
    
    try {
      const { sort = 'stars', order = 'desc', page = 1 } = filters;
      const data = await githubAPI.searchRepositories(query, sort, order, page);
      
      if (append) {
        setRepositories(prev => [...prev, ...data.items]);
      } else {
        setRepositories(data.items);
      }
      
      setPagination({
        currentPage: page,
        totalPages: Math.ceil(data.total_count / 30),
        totalCount: data.total_count,
        hasMore: data.items.length >= 30 && page < Math.ceil(data.total_count / 30)
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  const loadMore = useCallback((query, filters = {}) => {
    if (pagination.hasMore && !loadingMore) {
      const nextPage = pagination.currentPage + 1;
      searchRepositories(query, { ...filters, page: nextPage }, true);
    }
  }, [pagination, loadingMore, searchRepositories]);

  return {
    repositories,
    loading,
    loadingMore,
    error,
    pagination,
    searchRepositories,
    loadMore
  };
};
