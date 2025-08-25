import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AuthRedirect = ({ children, requireAuth = false, allowedRoles = [] }) => {
  const { user, loading, isAuthenticated, hasRole } = useAuth();

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  // If user is authenticated but trying to access login/role selection
  if (isAuthenticated() && !requireAuth) {
    // Redirect to appropriate dashboard based on role
    if (hasRole('student')) {
      return <Navigate to="/student/home" replace />;
    } else if (hasRole('trainer')) {
      return <Navigate to="/trainer/dashboard" replace />;
    }
  }

  // If specific roles are required, check if user has the required role
  if (allowedRoles.length > 0 && !allowedRoles.some(role => hasRole(role))) {
    // Redirect to appropriate dashboard based on user's actual role
    if (hasRole('student')) {
      return <Navigate to="/student/home" replace />;
    } else if (hasRole('trainer')) {
      return <Navigate to="/trainer/dashboard" replace />;
    }
    // If no valid role, redirect to role selection
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthRedirect;
