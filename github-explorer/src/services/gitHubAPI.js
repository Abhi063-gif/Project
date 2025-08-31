import axios from 'axios';

const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const api = axios.create({
  baseURL: GITHUB_API_BASE,
  headers: {
    // REQUIRED: User-Agent header (GitHub mandates this)
    'User-Agent': 'GitHub-Explorer-App',
    // Standard headers
    'Accept': 'application/vnd.github.v3+json',
    'X-GitHub-Api-Version': '2022-11-28',
    // Only add Authorization if token exists
    ...(GITHUB_TOKEN && { 'Authorization': `token ${GITHUB_TOKEN}` })
  },
  timeout: 10000
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 403) {
      console.error('GitHub API 403 Error:', {
        message: error.response?.data?.message,
        rateLimitRemaining: error.response?.headers['x-ratelimit-remaining'],
        rateLimitReset: error.response?.headers['x-ratelimit-reset']
      });
    }
    return Promise.reject(error);
  }
);

export const githubAPI = {
  // Search repositories
  searchRepositories: async (query, sort = 'stars', order = 'desc', page = 1) => {
    const response = await api.get('/search/repositories', {
      params: { q: query, sort, order, page, per_page: 30 }
    });
    return response.data;
  },

  // Get single repository
  getRepository: async (owner, repo) => {
    const response = await api.get(`/repos/${owner}/${repo}`);
    return response.data;
  },

  // Get repository stats
  getRepositoryStats: async (owner, repo) => {
    const [contributors, issues, releases] = await Promise.all([
      api.get(`/repos/${owner}/${repo}/contributors?per_page=10`),
      api.get(`/repos/${owner}/${repo}/issues?state=all&per_page=100`),
      api.get(`/repos/${owner}/${repo}/releases?per_page=10`)
    ]);
    
    return {
      contributors: contributors.data,
      issues: issues.data,
      releases: releases.data
    };
  },

  // Get language breakdown
  getLanguages: async (owner, repo) => {
    const response = await api.get(`/repos/${owner}/${repo}/languages`);
    return response.data;
  },

  // Get trending repositories
  getTrendingRepos: async (language = '', since = 'daily') => {
    const dateMap = { daily: 1, weekly: 7, monthly: 30 };
    const daysAgo = dateMap[since] || 1;
    const date = new Date(Date.now() - daysAgo * 86400000).toISOString().split('T')[0];
    const query = `created:>${date}${language ? ` language:${language}` : ''}`;
    
    return this.searchRepositories(query, 'stars', 'desc');
  }
};
