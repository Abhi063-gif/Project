import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  GitFork, 
  Eye, 
  Download, 
  ExternalLink, 
  Calendar,
  Users,
  AlertCircle,
  Code,
  ArrowLeft
} from 'lucide-react';
import { githubAPI } from '../services/gitHubAPI';
import { StarsChart } from '../components/charts/StarsChart';
import { ContributionsChart } from '../components/charts/ContributionsChart';
import { IssuesChart } from '../components/charts/IssuesChart';
import { LanguageDistribution } from '../components/charts/LanguageDistribution';
import { BookmarkButton } from '../components/repository/BookmarkButton';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { formatNumber, formatDate } from '../utils/formatters';

export const RepositoryDetail = () => {
  const { owner, name } = useParams();
  const [repository, setRepository] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchRepositoryDetails();
  }, [owner, name]);

  const fetchRepositoryDetails = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [repoData, repoStats] = await Promise.all([
        githubAPI.getRepository(owner, name),
        githubAPI.getRepositoryStats(owner, name)
      ]);
      
      setRepository(repoData);
      setStats(repoStats);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const generateChartData = () => {
    if (!stats) return {};

    // Generate mock time series data for demonstration
    const labels = Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - 11 + i);
      return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    });

    const starsData = {
      labels,
      stars: Array.from({ length: 12 }, (_, i) => 
        Math.floor(repository.stargazers_count * (0.1 + (i * 0.9) / 11))
      )
    };

    const contributionsData = {
      labels: stats.contributors.slice(0, 10).map(c => c.login),
      contributions: stats.contributors.slice(0, 10).map(c => c.contributions)
    };

    const issuesData = {
      open: stats.issues.filter(issue => issue.state === 'open').length,
      closed: stats.issues.filter(issue => issue.state === 'closed').length
    };

    // Mock language data
    const languages = ['JavaScript', 'CSS', 'HTML', 'TypeScript'];
    const languageData = {
      languages,
      percentages: [45, 25, 20, 10]
    };

    return { starsData, contributionsData, issuesData, languageData };
  };

  if (loading) {
    return <LoadingSpinner size="lg" message="Loading repository details..." />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Error loading repository
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
      </div>
    );
  }

  if (!repository) return null;

  const chartData = generateChartData();
  const tabs = [
    { id: 'overview', name: 'Overview', icon: Code },
    { id: 'analytics', name: 'Analytics', icon: Users }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <div className="flex items-center space-x-2">
                <Link
                  to="/"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {repository.name}
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                by <span className="font-medium">{repository.owner.login}</span>
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                {repository.description}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <BookmarkButton repository={repository} />
            <a
              href={repository.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View on GitHub
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
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
                <p className="text-sm text-gray-600 dark:text-gray-400">Watching</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formatNumber(repository.watchers_count)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Issues</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {repository.open_issues_count}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                    ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Repository Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Language:</span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {repository.language || 'Not specified'}
                      </span>
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
                      <span className="text-gray-600 dark:text-gray-400">Created:</span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {formatDate(repository.created_at)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Last Updated:</span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {formatDate(repository.updated_at)}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <a
                      href={repository.clone_url}
                      className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Download className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Clone Repository</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Download source code</p>
                      </div>
                    </a>
                    
                    <a
                      href={`${repository.html_url}/issues`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <AlertCircle className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">View Issues</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Report bugs and feature requests</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && chartData && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <StarsChart data={chartData.starsData} />
                <IssuesChart data={chartData.issuesData} />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ContributionsChart data={chartData.contributionsData} />
                <LanguageDistribution data={chartData.languageData} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
