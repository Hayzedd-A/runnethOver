import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as api from '../services/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => api.getStoredUser());
  const [saved, setSaved] = useState(() => api.getStoredSaved());

  useEffect(() => {
    api.setStoredUser(user);
  }, [user]);

  useEffect(() => {
    api.setStoredSaved(saved);
  }, [saved]);

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

  const logout = () => setUser(null);

  const isSaved = (id) => saved.some((p) => p.id === id);

  const toggleSaved = (product) => {
    setSaved((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) return prev.filter((p) => p.id !== product.id);
      return [product, ...prev];
    });
  };

  const updateAccount = async (updates) => {
    const updated = await api.updateAccount(user, updates);
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
    }),
    [user, saved]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
