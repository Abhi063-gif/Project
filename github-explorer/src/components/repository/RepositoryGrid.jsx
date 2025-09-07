import React, { useRef, useEffect } from 'react';
import { RepositoryCard } from './RepositoryCard';
import { LoadingSpinner } from '../common/LoadingSpinner';

export const RepositoryGrid = ({
  repositories,
  loading,
  loadingMore,
  onRepositoryClick,
  loadMore,
  hasMore,
  query,
  sortBy,
  sortOrder,
}) => {
  /* ---------- declare hooks first ---------- */
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (!hasMore) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore(query, { sort: sortBy, order: sortOrder });
        }
      },
      { rootMargin: '400px' }
    );
    const node = sentinelRef.current;
    if (node) obs.observe(node);
    return () => {
      if (node) obs.unobserve(node);
      obs.disconnect();
    };
  }, [hasMore, loadMore, query, sortBy, sortOrder]);

  /* ---------- conditional rendering ---------- */
  if (loading && !loadingMore) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="glass rounded-lg p-6 animate-pulse h-60" />
        ))}
      </div>
    );
  }

  if (!repositories.length) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        No repositories found
      </div>
    );
  }

  /* ---------- normal grid + sentinel ---------- */
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {repositories.map((repo) => (
          <RepositoryCard
            key={repo.id}
            repository={repo}
            onClick={onRepositoryClick}
          />
        ))}
      </div>

      {/* invisible element watched by IntersectionObserver */}
      <div ref={sentinelRef} />

      {loadingMore && (
        <div className="flex justify-center py-6">
          <LoadingSpinner message="Loading more…" />
        </div>
      )}
    </>
  );
};
