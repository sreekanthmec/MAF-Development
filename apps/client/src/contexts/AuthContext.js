import React, { createContext, useContext, useState, useEffect } from 'react';
import { decodeJwt } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const userRole = localStorage.getItem('userRole');

      console.log('Auth check - accessToken:', !!accessToken, 'userRole:', userRole);

      if (!accessToken || !userRole) {
        console.log('Auth check - missing token or role, setting user to null');
        setUser(null);
        setLoading(false);
        return;
      }

      // Decode and validate token
      const decodedToken = decodeJwt(accessToken);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp < currentTime) {
        // Token expired
        logout();
        return;
      }

      // Check if user role matches token role
      if (decodedToken.role !== userRole) {
        logout();
        return;
      }

      // User is authenticated
      console.log('Auth check - user authenticated successfully');
      setUser({
        role: userRole,
        accessToken,
        ...decodedToken
      });
    } catch (error) {
      console.error('Auth check failed:', error);
      // In production, if token decoding fails, clear everything and start fresh
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('accessToken', userData.accessToken);
    localStorage.setItem('userRole', userData.role);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userRole');
    // Clear any other user-related data
    localStorage.removeItem('userProfile');
    localStorage.removeItem('userPreferences');
  };

  const isAuthenticated = () => {
    return user !== null && user.role && user.accessToken;
  };

  const hasRole = (role) => {
    return user && user.role && user.role === role;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
    hasRole,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
