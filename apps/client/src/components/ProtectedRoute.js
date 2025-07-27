import React from "react";
import { Navigate } from "react-router-dom";
import { decodeJwt } from "../services/api";

const ProtectedRoute = ({ children, role }) => {
  const accessToken = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("userRole");

  // Check if user is authenticated
  if (!accessToken) {
    return <Navigate to={`/${role}`} replace />;
  }

  // Check if token is valid
  try {
    const decodedToken = decodeJwt(accessToken);
    const currentTime = Math.floor(Date.now() / 1000);
    
    if (decodedToken.exp < currentTime) {
      // Token expired, clear storage and redirect to login
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userRole");
      return <Navigate to={`/${role}`} replace />;
    }

    // Check if user has the correct role
    if (decodedToken.role !== role) {
      // User has wrong role, redirect to their correct role's login
      return <Navigate to={`/${decodedToken.role}`} replace />;
    }
  } catch (error) {
    // Invalid token, clear storage and redirect to login
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    return <Navigate to={`/${role}`} replace />;
  }

  // Check if userRole matches the required role
  if (userRole !== role) {
    return <Navigate to={`/${role}`} replace />;
  }

  return children;
};

export default ProtectedRoute; 