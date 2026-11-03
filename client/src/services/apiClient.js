
import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Separate client for refreshing tokens.
// It does NOT use the interceptors below.
const refreshClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Access token exists only in JavaScript memory.
let accessToken = null;

// AuthContext registers this callback.
let onAuthFailure = () => {};

export const setAccessToken = (token) => {
  accessToken = token;
};

export const registerAuthFailureHandler = (callback) => {
  onAuthFailure = callback;
};

// REQUEST INTERCEPTOR
apiClient.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Shared refresh promise prevents concurrent refresh requests.
let refreshPromise = null;

const refreshAccessToken = async () => {
  if (!refreshPromise) {
    refreshPromise = refreshClient
      .post("/auth/refresh")
      .then((response) => {
        const newToken = response.data.accessToken;

        setAccessToken(newToken);

        return newToken;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

// RESPONSE INTERCEPTOR
apiClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const status = error.response?.status;

    const isAuthEndpoint =
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/register") ||
      originalRequest.url?.includes("/auth/refresh") ||
      originalRequest.url?.includes("/auth/logout");

    // Only handle 401 responses from protected API requests.
    if (
      status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshAccessToken();

        originalRequest.headers.Authorization =
          `Bearer ${newToken}`;

        // Retry the original failed request.
        return apiClient(originalRequest);
      } catch (refreshError) {
        setAccessToken(null);

        onAuthFailure();

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
