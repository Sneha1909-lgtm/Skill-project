/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from 'react';
import { loginApi } from '../services/api.js';
import { toast } from 'sonner';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('klu_token');
    const storedRole = localStorage.getItem('klu_role');
    const storedUsername = localStorage.getItem('klu_username');
    if (storedToken && storedRole && storedUsername) {
      setToken(storedToken);
      setRole(storedRole);
      setUser({ username: storedUsername });
      setName(storedUsername);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const res = await loginApi(username, password);
      const { token: jwt, role: userRole, username: uname } = res.data;

      localStorage.setItem('klu_token', jwt);
      localStorage.setItem('klu_role', userRole);
      localStorage.setItem('klu_username', uname);

      setToken(jwt);
      setRole(userRole);
      setUser({ username: uname });
      setName(uname);

      toast.success('Access Granted', { description: `Welcome to KL University Nexus ERP` });
      return { success: true, role: userRole };
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid credentials. Please try again.';
      toast.error('Authentication Failed', { description: msg });
      return { success: false };
    }
  };

  const logout = () => {
    localStorage.removeItem('klu_token');
    localStorage.removeItem('klu_role');
    localStorage.removeItem('klu_username');
    setUser(null);
    setToken(null);
    setRole(null);
    setName('');
    toast.info('Session Terminated', { description: 'You have been signed out securely.' });
  };

  return (
    <AuthContext.Provider value={{ user, token, role, name, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};