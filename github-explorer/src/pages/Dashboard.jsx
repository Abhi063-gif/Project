import React, { useState, useEffect } from 'react';
import { SearchBar } from '../components/filters/SearchBar';
import { LanguageFilter } from '../components/filters/LanguageFilter';
import { SortControls } from '../components/filters/SortControls';
import { RepositoryGrid } from '../components/repository/RepositoryGrid';
import { StarsChart } from '../components/charts/StarsChart';
import { LanguageDistribution } from '../components/charts/LanguageDistribution';
import { useGitHubAPI } from '../hooks/useGitHubAPI';
import { useDebounce } from '../hooks/useDebounce';
import { TrendingUp, Star, GitFork, Code } from 'lucide-react';

export const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('react');
  const [language, setLanguage] = useState('');
  const [sortBy, setSortBy] = useState('stars');
  const [sortOrder, setSortOrder] = useState('desc');

  const debouncedQuery = useDebounce(searchQuery, 500);
  const {
    repositories,
    loading,
    loadingMore,
    error,
    pagination,
    searchRepositories,
    loadMore,
  } = useGitHubAPI();

  /* ---------------- search trigger ---------------- */
  useEffect(() => {
    if (!debouncedQuery) return;
    const q = `${debouncedQuery}${language ? ` language:${language}` : ''}`;
    searchRepositories(q, { sort: sortBy, order: sortOrder });
  }, [debouncedQuery, language, sortBy, sortOrder, searchRepositories]);

  /* ---------------- chart helpers ---------------- */
  const generateChartData = () => {
    if (!repositories.length) return null;

    /* Stars – take top 10 repos by stars */
    const top10 = [...repositories]
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 10);

    const starsData = {
      labels: top10.map((r) => r.name.slice(0, 15)),
      stars: top10.map((r) => r.stargazers_count),
    };

    /* Languages – aggregate counts */
    const langCounts = {};
    repositories.forEach((r) => {
      if (!r.language) return;
      langCounts[r.language] = (langCounts[r.language] || 0) + 1;
    });

    const languages = Object.keys(langCounts)
      .sort((a, b) => langCounts[b] - langCounts[a])
      .slice(0, 6);

    const total = languages.reduce((sum, l) => sum + langCounts[l], 0);
    const languageData = {
      languages,
      percentages: languages.map((l) =>
        Math.round((langCounts[l] / total) * 100)
      ),
    };

    return { starsData, languageData };
  };

  const chartData = generateChartData();
  const totalStars = repositories.reduce((s, r) => s + r.stargazers_count, 0);
  const totalForks = repositories.reduce((s, r) => s + r.forks_count, 0);
  const avgStars = repositories.length
    ? Math.floor(totalStars / repositories.length)
    : 0;

  const handleRepoClick = (repo) =>
    window.open(repo.html_url, '_blank', 'noopener');

  /* ---------------- render ---------------- */
  return (
    <div className="w-full">
      {/* Enhanced Header with Glassmorphism */}
      <div className="backdrop-blur-md bg-white/10 dark:bg-gray-800/10 rounded-3xl p-8 mb-8 border border-white/20 shadow-xl">
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3">
            GitHub Explorer
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-light">
            Discover and analyze trending open source projects with beautiful insights
          </p>
        </div>

        {/* Animated Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Repositories', value: repositories.length, icon: Code, color: 'from-blue-500 to-purple-600' },
            { label: 'Total Likes', value: totalStars.toLocaleString(), icon: Star, color: 'from-yellow-500 to-orange-500' },
            { label: 'Total Forks', value: totalForks.toLocaleString(), icon: GitFork, color: 'from-green-500 to-teal-500' },
            { label: 'Average Likes', value: avgStars.toLocaleString(), icon: TrendingUp, color: 'from-pink-500 to-rose-500' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <div className="relative backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Search Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-2">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search repositories..."
            />
          </div>
          <LanguageFilter value={language} onChange={setLanguage} />
          <SortControls
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={setSortBy}
            onOrderChange={setSortOrder}
          />
        </div>
      </div>

      {/* Charts Section */}
      {chartData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="backdrop-blur-md bg-white/10 dark:bg-gray-800/10 rounded-3xl p-6 border border-white/20 shadow-xl">
            <StarsChart 
              data={chartData.starsData} 
              title="⭐ Stars Distribution Across Top Repositories" 
            />
          </div>
          <div className="backdrop-blur-md bg-white/10 dark:bg-gray-800/10 rounded-3xl p-6 border border-white/20 shadow-xl">
            <LanguageDistribution 
              data={chartData.languageData}
              title="🚀 Programming Languages" 
            />
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="backdrop-blur-md bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-300 px-6 py-4 rounded-2xl mb-6 shadow-lg">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
            Error: {error}
          </div>
        </div>
      )}

      {/* Repository Grid with all the search/filter functionality */}
      <RepositoryGrid
        repositories={repositories}
        loading={loading}
        loadingMore={loadingMore}
        onRepositoryClick={handleRepoClick}
        loadMore={loadMore}
        hasMore={pagination.hasMore}
        query={`${debouncedQuery}${language ? ` language:${language}` : ''}`}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />
    </div>
  );
};
