/**
 * Application Constants
 */

export const CATEGORIES = [
  { id: 'nature', label: 'Nature 🌿', value: 'nature' },
  { id: 'animals', label: 'Animals 🐾', value: 'animals' },
  { id: 'sports', label: 'Sports ⚽', value: 'sports' },
  { id: 'technology', label: 'Technology 💻', value: 'technology' },
  { id: 'people', label: 'People 👥', value: 'people' },
  { id: 'business', label: 'Business 💼', value: 'business' },
  { id: 'food', label: 'Food 🍕', value: 'food' },
  { id: 'travel', label: 'Travel ✈️', value: 'travel' },
];

export const PAGINATION = {
  ITEMS_PER_PAGE: 9,
  DEFAULT_PAGE: 1,
};

export const GRID = {
  COLUMNS: 3,
  ROWS: 3,
};

export const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'id', label: 'By ID' },
];

export const ERROR_MESSAGES = {
  FETCH_FAILED: 'Failed to fetch images. Please try again later.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  NO_RESULTS: 'No results found.',
};

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';