import axios from 'axios';

const GITHUB_API_BASE = 'https://api.github.com';

const GITHUB_TOKEN =
  (typeof import.meta !== 'undefined' ? import.meta.env?.VITE_GITHUB_TOKEN : undefined) ||
  (typeof process !== 'undefined' ? process.env?.REACT_APP_GITHUB_TOKEN : undefined) ||
  '';

const api = axios.create({
  baseURL: GITHUB_API_BASE,
  headers: {
    // GitHub requires a valid User-Agent (a simple app name is fine)
    // Browsers already send a UA, but providing an app name is recommended.
    'User-Agent': 'github-explorer',
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}) // token or Bearer both work; Bearer recommended
  },
  timeout: 10000
});

// Centralized error visibility including rate-limit hints
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 403 || status === 429) {
      console.error('GitHub API rate/forbidden:', {
        status,
        message: error?.response?.data?.message,
        remaining: error?.response?.headers?.['x-ratelimit-remaining'],
        reset: error?.response?.headers?.['x-ratelimit-reset']
      });
    }
    return Promise.reject(error);
  }
);

// Named functions (exported individually and as an object)
export async function searchRepositories(query, sort = 'stars', order = 'desc', page = 1, per_page = 30) {
  const q = (query || '').trim();
  if (!q) return { total_count: 0, incomplete_results: false, items: [] };
  const response = await api.get('/search/repositories', {
    params: { q, sort, order, page, per_page }
  });
  return response.data;
}

export async function getRepository(owner, repo) {
  const response = await api.get(`/repos/${owner}/${repo}`);
  return response.data;
}

export async function getRepositoryStats(owner, repo) {
  const [contributors, issues, releases] = await Promise.all([
    api.get(`/repos/${owner}/${repo}/contributors`, { params: { per_page: 10 } }),
    api.get(`/repos/${owner}/${repo}/issues`, { params: { state: 'all', per_page: 100 } }),
    api.get(`/repos/${owner}/${repo}/releases`, { params: { per_page: 10 } })
  ]);

  return {
    contributors: contributors.data,
    issues: issues.data,
    releases: releases.data
  };
}

export async function getLanguages(owner, repo) {
  const response = await api.get(`/repos/${owner}/${repo}/languages`);
  return response.data;
}

export async function getTrendingRepos(language = '', since = 'daily', page = 1) {
  const dateMap = { daily: 1, weekly: 7, monthly: 30 };
  const daysAgo = dateMap[since] ?? 1;
  const date = new Date(Date.now() - daysAgo * 86400000).toISOString().split('T');
  const query = `created:>${date}${language ? ` language:${language}` : ''}`;
  return searchRepositories(query, 'stars', 'desc', page);
}

// Optional aggregate export to support: import { githubAPI } from '../services/githubAPI'
export const githubAPI = {
  searchRepositories,
  getRepository,
  getRepositoryStats,
  getLanguages,
  getTrendingRepos
};
