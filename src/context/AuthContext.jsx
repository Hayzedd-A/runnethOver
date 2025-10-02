import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as api from '../services/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => api.getStoredUser());
  const [saved, setSaved] = useState(() => api.getStoredSaved());
  const [loadingFavorites, setLoadingFavorites] = useState(false);

  useEffect(() => {
    api.setStoredUser(user);
  }, [user]);

  useEffect(() => {
    api.setStoredSaved(saved);
  }, [saved]);

  // Load favorites from backend when user logs in
  useEffect(() => {
    if (user) {
      loadFavorites();
    } else {
      setSaved([]);
    }
  }, [user]);

  const loadFavorites = async () => {
    try {
      setLoadingFavorites(true);
      const favorites = await api.getFavorites();
      setSaved(favorites);
    } catch (error) {
      console.error('Failed to load favorites:', error);
    } finally {
      setLoadingFavorites(false);
    }
  };

  const login = async (email, password) => {
    const u = await api.login(email, password);
    setUser(u);
    return u;
  };

  const signup = async (data) => {
    const u = await api.signup(data);
    setUser(u);
    return u;
  };

  const logout = () => {
    setUser(null);
    setSaved([]);
  };

  const isSaved = (id) => saved.some((p) => p.id === id || p._id === id);

  const toggleSaved = async (product) => {
    if (!user) return;

    const exists = isSaved(product.id || product._id);
    
    try {
      if (exists) {
        // Remove from favorites
        const favoriteToRemove = saved.find((p) => p.id === product.id || p._id === product.id);
        if (favoriteToRemove) {
          await api.removeFavorite(favoriteToRemove._id || favoriteToRemove.id);
          setSaved((prev) => prev.filter((p) => (p.id || p._id) !== (product.id || product._id)));
        }
      } else {
        // Add to favorites
        const favorite = await api.addToFavorites(product.id || product._id);
        setSaved((prev) => [favorite, ...prev]);
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      // Optionally show error to user
    }
  };

  const updateAccount = async (updates) => {
    const updated = await api.updateAccount(user, updates);
    setUser(updated);
    return updated;
  };

  const uploadProfileImage = async (file) => {
    const updated = await api.uploadProfileImage(file);
    setUser(updated);
    return updated;
  };

  const value = useMemo(
    () => ({
      user,
      login,
      signup,
      logout,
      saved,
      isSaved,
      toggleSaved,
      updateAccount,
      uploadProfileImage,
      loadingFavorites,
    }),
    [user, saved, loadingFavorites]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
