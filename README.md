# Github-explorer
GitHub Explorer is a React-based web app that discovers public repositories and shows live stats like stars, forks, and watching using the GitHub REST API, presented in a responsive layout with a route-aware sidebar and bookmarking.
It emphasizes accurate counts via repository payloads and a clean deployment path to GitHub Pages for static hosting.

Overview
The application enables fast repository search and rich detail pages, mapping “Total Stars,” “Total Forks,” and “Watching” directly to GitHub’s repository fields for real-time accuracy.
A persistent sidebar reacts to the current route, fetching the active repo’s details to keep quick stats synchronized with the main view.

Technologies used
React (SPA UI), React Router (routing and route params), and Context/Custom Hooks for state and data access.

Axios for REST calls, Tailwind CSS for styling, and Lucide React for icons.

GitHub REST API for repository data and counts, with optional token-based auth to improve rate limits.

GitHub Pages for lightweight static hosting directly from a selected branch/folder.

What it does
Searches public repositories and renders results with essential metadata and sorting aligned to GitHub’s search semantics.

Displays repository detail pages with dynamic quick stats (stars/forks/watching), description, links, and supporting visuals.

Supports bookmarking, basic filtering, and a clear error/empty state experience during network or rate-limit conditions.

How it works
A service layer (githubAPI) wraps GET /repos/{owner}/{repo} and related endpoints, exposing helpers like searchRepositories and getRepository.

The sidebar reads route params (owner, repo/name) and fetches the same repository payload to render stargazers_count, forks_count, and subscribers_count for accurate “Watching.”

Requests include recommended headers and an optional token (via environment variable) to raise request quotas and reduce “no results” from rate limiting.

Key points
Accurate metrics: “Total Stars” ← stargazers_count, “Total Forks” ← forks_count, “Watching” ← subscribers_count (true watchers).

Robust routing: route-parameter detection ensures the sidebar updates as navigation changes without full-page reloads.

Resilience: centralized error handling surfaces API errors and rate-limit headers, improving transparency during heavy usage.

Maintainability: strict import path casing and consistent named exports prevent build-time “not exported” or “file name mismatch” issues.

Deployability: static assets are published directly from a branch root or docs/ folder to GitHub Pages for a simple, repeatable release.

Project structure (high level)
components/layout for Header, Sidebar, and shell; components/repository for cards, grids, and details; components/common for loading, error boundary, and pagination.

hooks for API/data utilities; services for GitHub integrations; utils for formatters and constants; pages for Dashboard, Bookmarks, and Repository detail.

Setup and run
Install dependencies and configure an environment variable for a GitHub token (e.g., VITE_GITHUB_TOKEN or REACT_APP_GITHUB_TOKEN) to increase rate limits.

Start the dev server to test search and detail views with live counts, then build and publish the production bundle to the selected GitHub Pages source.

Business value
Speeds repository discovery and evaluation by surfacing actionable stats instantly, reducing context switches to GitHub.com.

Provides a deploy-anywhere static bundle with minimal ops overhead, suitable for portfolios, internal dashboards, or teaching tools.
