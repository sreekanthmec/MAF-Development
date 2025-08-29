// API Configuration
const API_CONFIG = {
  development: {
    baseURL: "http://localhost:5000/api",
    timeout: 10000,
  },
  production: {
    baseURL: "https://maf-backend-production-5619.up.railway.app/api",
    timeout: 15000, // Longer timeout for production
  },
};

// Get current environment
const currentEnv = process.env.NODE_ENV || 'development';

// Export current config
export const API_BASE_URL = API_CONFIG[currentEnv].baseURL;
export const API_TIMEOUT = API_CONFIG[currentEnv].timeout;

// Export full config for debugging
export const getApiConfig = () => API_CONFIG[currentEnv];

export default API_CONFIG[currentEnv]; 