export const formatNumber = (num) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;
  return `${Math.ceil(diffDays / 365)} years ago`;
};

export const formatLanguageColor = (language) => {
  const colors = {
    javascript: '#f1e05a',
    python: '#3572A5',
    java: '#b07219',
    typescript: '#2b7489',
    go: '#00ADD8',
    rust: '#dea584',
    cpp: '#f34b7d',
    csharp: '#239120',
    php: '#4F5D95',
    ruby: '#701516'
  };
  return colors[language?.toLowerCase()] || '#6b7280';
};
