import axios from "axios";
import { API_BASE_URL, API_TIMEOUT } from "../config/api";

// Create an Axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Include credentials (cookies) in requests
});

// Helper function to add delay for mock API calls
const addDelay = (ms = 2000) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Function to send OTP
export const sendOtp = async (countryCode, mobileNumber, role) => {
  try {
    await addDelay(); // Add 2-second delay
    const response = await api.post("/otp/send", {
      countryCode,
      mobileNumber,
      role,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};

// Function to validate OTP and store access token
export const validateOtp = async (countryCode, mobileNumber, otpCode, role) => {
  try {
    await addDelay(); // Add 2-second delay
    const response = await api.post("/otp/validate", {
      countryCode,
      mobileNumber,
      otpCode,
      role,
    });
    localStorage.setItem("accessToken", response.data.accessToken); // Store the access token
    return response.data;
  } catch (error) {
    console.error("Error validating OTP:", error);
    throw error;
  }
};

// Function for trainer login
export const trainerLogin = async (email, password) => {
  try {
    await addDelay(); // Add 2-second delay
    const response = await api.post("/trainer/login", {
      email,
      password,
    });
    localStorage.setItem("accessToken", response.data.accessToken); // Store the access token
    localStorage.setItem("userRole", "trainer"); // Set the user role for trainer
    return response.data;
  } catch (error) {
    console.error("Error trainer login:", error);
    throw error;
  }
};

// Function to update the user profile (dummy for now)
export const updateProfile = async (profileData) => {
  await addDelay(); // Simulate network delay
  // Optionally log the data for debugging
  console.log("Mock updateProfile called with:", profileData);
  // Return a dummy success response
  return { success: true, profile: profileData };
};

// Function to refresh the token
export const refreshToken = async () => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/token`,
      {}, // Empty body
      {
        withCredentials: true, // Ensure cookies (like refreshToken) are sent
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const newAccessToken = response.data.accessToken;
    localStorage.setItem("accessToken", newAccessToken); // Update the access token
    return newAccessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};

// Function to decode a JWT
export const decodeJwt = (token) => {
  try {
    if (!token || typeof token !== 'string') {
      throw new Error('Invalid token');
    }
    
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }
    
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('JWT decode error:', error);
    // Return a default structure to prevent crashes
    return {
      exp: 0,
      role: null
    };
  }
};

// Function to check token expiry
export const checkTokenExpiry = (token) => {
  const decodedToken = decodeJwt(token);
  const expiryTime = decodedToken.exp * 1000;
  const currentTime = new Date().getTime();

  return currentTime >= expiryTime;
};

// Axios interceptor to handle token refresh on 403 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const excludedEndpoints = ["/otp/send", "/otp/validate"];

    // Check if the response status is 403 Forbidden and not from excluded endpoints
    if (
      error.response &&
      error.response.status === 403 &&
      !excludedEndpoints.includes(originalRequest.url) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshToken();
        // Update the original request's Authorization header
        originalRequest.headers["Authorization"] = `${newAccessToken}`;
        // Retry the original request with the new access token
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh error:", refreshError);
        // If refreshing the token fails, log out the user (clear tokens)
        localStorage.removeItem("accessToken");
        window.location.href = "/login"; // Redirect to login page
        throw refreshError;
      }
    }

    return Promise.reject(error);
  }
);

// Set default Authorization header if token is available and valid
const accessToken = localStorage.getItem("accessToken");
if (accessToken && !checkTokenExpiry(accessToken)) {
  api.defaults.headers.common["Authorization"] = `${accessToken}`; // Use token without Bearer
}

export default api;
