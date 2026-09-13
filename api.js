const API_BASE_URL = 'http://localhost:5000/api';

export const fetchProperties = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.city) params.append('city', filters.city);
  if (filters.minBudget) params.append('minBudget', filters.minBudget);
  if (filters.maxBudget) params.append('maxBudget', filters.maxBudget);
  if (filters.gender && filters.gender !== 'Any') params.append('gender', filters.gender);

  const response = await fetch(`${API_BASE_URL}/properties?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch properties');
  }
  return response.json();
};

// Generic request helper used by AuthContext
const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'API request failed');
  }
  return data;
};

const api = {
  get: (endpoint, options) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options) =>
    request(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body, options) =>
    request(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  delete: (endpoint, options) => request(endpoint, { ...options, method: 'DELETE' }),
};

export default api;