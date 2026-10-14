import { createContext, useContext, useEffect, useState } from 'react';
import * as authService from '../services/authService.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setLoading(false);
      return;
    }

    authService
      .getMe()
      .then(setUser)
      .catch(() => localStorage.removeItem('adminToken'))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const { token, user: loggedInUser } = await authService.login(email, password);
    localStorage.setItem('adminToken', token);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
