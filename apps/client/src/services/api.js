import axios from "axios";

// Create an Axios instance with base configuration
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Include credentials (cookies) in requests
});

// Function to send OTP
export const sendOtp = async (countryCode, mobileNumber, role) => {
  try {
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
    const response = await api.post("/otp/validate", {
      countryCode,
      mobileNumber,
      otpCode,
      role,
    });
    localStorage.setItem("accessToken", response.data.accessToken); // Store the access token
    return response.data;
  } catch (error) {
    console.error("Erðror validating OTP:", error);
    throw error;
  }
};

// Function for trainer login
export const trainerLogin = async (email, password) => {
  try {
    const response = await api.post("/trainer/login", {
      email,
      password,
    });
    localStorage.setItem("accessToken", response.data.accessToken); // Store the access token
    return response.data;
  } catch (error) {
    console.error("Error trainer login:", error);
    throw error;
  }
};

// Function to update the user profile
export const updateProfile = async (profileData) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    // Check if the token is valid before proceeding
    if (!accessToken) {
      throw new Error("No access token found");
    }

    const decodedToken = decodeJwt(accessToken); // Decode the token to get the _id
    const userId = decodedToken._id;

    // Create FormData object
    const formData = new FormData();
    formData.append("_id", userId); // Ensure the user ID is appended

    // Conditionally append fields only if they have defined values
    if (profileData.name) formData.append("name", profileData.name);
    if (profileData.age) formData.append("age", profileData.age);
    if (profileData.sex) formData.append("sex", profileData.sex);
    if (profileData.hasGloves !== undefined)
      formData.append("hasGloves", profileData.hasGloves);
    if (profileData.gloveSize)
      formData.append("gloveSize", profileData.gloveSize);
    if (profileData.hasHandwrap !== undefined)
      formData.append("hasHandwrap", profileData.hasHandwrap);

    // Send the API request
    const response = await api.post("/user/addProfile", formData, {
      withCredentials: true,
      headers: {
        Authorization: `${accessToken}`, // Use token without Bearer
        "Content-Type": "multipart/form-data", // This header is automatically set by FormData, but specifying it here ensures it remains consistent
      },
    });

    return response.data; // Return the response data
  } catch (error) {
    console.error("Error updating profile:", error);

    if (error.response && error.response.status === 403) {
      console.error(
        "Forbidden error - possibly due to an invalid or expired token."
      );
    }

    // Re-throw the error to handle it in the calling function
    throw error;
  }
};

// Function to refresh the token
export const refreshToken = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/token",
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
  const base64Url = token.split(".")[1];
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
