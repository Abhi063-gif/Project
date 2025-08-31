export const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
  const diffMinutes = Math.ceil(diffTime / (1000 * 60));

  if (diffMinutes < 60) {
    return `${diffMinutes} minutes ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hours ago`;
  } else if (diffDays === 1) {
    return 'yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    return `${Math.ceil(diffDays / 7)} weeks ago`;
  } else if (diffDays < 365) {
    return `${Math.ceil(diffDays / 30)} months ago`;
  } else {
    return `${Math.ceil(diffDays / 365)} years ago`;
  }
};

export const isDateInRange = (date, startDate, endDate) => {
  const checkDate = new Date(date);
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  if (start && checkDate < start) return false;
  if (end && checkDate > end) return false;
  return true;
};

export const getDateRangePresets = () => {
  const now = new Date();
  const presets = {};

  // Last 24 hours
  presets.day = {
    start: new Date(now.getTime() - 24 * 60 * 60 * 1000),
    end: now
  };

  // Last 7 days
  presets.week = {
    start: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
    end: now
  };

  // Last 30 days
  presets.month = {
    start: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
    end: now
  };

  // Last 90 days
  presets.quarter = {
    start: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000),
    end: now
  };

  // Last year
  presets.year = {
    start: new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000),
    end: now
  };

  return presets;
};

export const formatDateForAPI = (date) => {
  if (!date) return '';
  return new Date(date).toISOString().split('T')[0];
};

export const parseISO = (dateString) => {
  return new Date(dateString);
};

export const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date);
};
