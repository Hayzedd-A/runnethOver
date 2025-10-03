const API_BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;
const LS_USER = import.meta.env.VITE_APP_LS_USER;
const LS_TOKEN = import.meta.env.VITE_APP_LS_TOKEN;
const LS_SAVED = import.meta.env.VITE_APP_LS_SAVED;

// Helper to get auth token
function getToken() {
  return localStorage.getItem(LS_TOKEN);
}

// Helper to set auth token
function setToken(token) {
  if (token) {
    localStorage.setItem(LS_TOKEN, token);
  } else {
    localStorage.removeItem(LS_TOKEN);
  }
}

// Helper for API requests
async function apiRequest(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    ...options.headers,
  };

  // Add auth token if available
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Add Content-Type for JSON requests (unless it's FormData)
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

// Local storage helpers
export function getStoredUser() {
  try {
    const raw = localStorage.getItem(LS_USER);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(u) {
  try {
    if (!u) {
      localStorage.removeItem(LS_USER);
      setToken(null);
    } else {
      localStorage.setItem(LS_USER, JSON.stringify(u));
    }
  } catch (err){
    console.log(err)
  }
}

export function getStoredSaved() {
  try {
    const raw = localStorage.getItem(LS_SAVED);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function setStoredSaved(items) {
  try {
    localStorage.setItem(LS_SAVED, JSON.stringify(items || []));
  }  catch (err){
    console.log(err)
  }
}

// Auth APIs
export async function login(email, password) {
  const data = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  // Store token
  if (data.token) {
    setToken(data.token);
  }

  // Return user data
  return data.user;
}

export async function signup({ firstName, lastName, email, password }) {
  const data = await apiRequest('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ firstName, lastName, email, password }),
  });

  // Store token
  if (data.token) {
    setToken(data.token);
  }

  // Return user data
  return data.user;
}

export async function googleAuth() {
  // Redirect to Google OAuth endpoint
  window.location.href = `${API_BASE_URL}/auth/google`;
}

// Product APIs
export async function uploadImageAndGetProducts(file) {
  const formData = new FormData();
  formData.append('image', file);

  const data = await apiRequest('/products/upload-image', {
    method: 'POST',
    body: formData,
  });

  return data.products || [];
}

export async function searchProducts(query) {
  const data = await apiRequest(`/products?query=${encodeURIComponent(query)}`);
  return data.products || [];
}

// Favorites APIs
export async function addToFavorites(productId) {
  const data = await apiRequest('/favorites', {
    method: 'POST',
    body: JSON.stringify({ productId }),
  });
  return data.favorite;
}

export async function getFavorites() {
  const data = await apiRequest('/favorites');
  return data.favorites || [];
}

export async function removeFavorite(id) {
  await apiRequest(`/favorites/${id}`, {
    method: 'DELETE',
  });
}

// Profile APIs
export async function updateAccount(user, updates) {
  const data = await apiRequest('/profile', {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
  return data.user;
}

export async function uploadProfileImage(file) {
  const formData = new FormData();
  formData.append('image', file);

  const data = await apiRequest('/profile/image', {
    method: 'POST',
    body: formData,
  });

  return data.user;
}

// Helper to get profile image URL
export function getProfileImageUrl(filename) {
  if (!filename) return '';
  if (filename.startsWith('http')) return filename;
  return `http://localhost:5000/uploads/profiles/${filename}`;
}
