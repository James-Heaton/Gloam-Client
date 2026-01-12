import { useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister } from '../services/api';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('gloam_token');
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      setToken(authData.token);
      setUser({
        id: authData.user_id,
        username: authData.username,
      });
    }
    setLoading(false);
  }, []);

  const register = async (username, password) => {
    const data = await apiRegister(username, password);
    localStorage.setItem('gloam_token', JSON.stringify(data));
    setToken(data.token);
    setUser({
      id: data.user_id,
      username: data.username,
    });
    return data;
  };

  const login = async (username, password) => {
    const data = await apiLogin(username, password);
    localStorage.setItem('gloam_token', JSON.stringify(data));
    setToken(data.token);
    setUser({
      id: data.user_id,
      username: data.username,
    });
    return data;
  };

  const logout = () => {
    localStorage.removeItem('gloam_token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};