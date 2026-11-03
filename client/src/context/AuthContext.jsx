
import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import {
  loginUser,
  getCurrentUser,
  logoutUser,
} from "../services/authService";

import apiClient, {
  setAccessToken,
  registerAuthFailureHandler,
} from "../services/apiClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session when the application loads.
  useEffect(() => {
    let isMounted = true;

    const restoreSession = async () => {
      try {
        // Refresh token is automatically sent via HttpOnly cookie.
        const response = await apiClient.post("/auth/refresh");

        setAccessToken(response.data.accessToken);

        // Request interceptor attaches the new access token.
        const userResponse = await getCurrentUser();

        if (isMounted) {
          setUser(userResponse.user);
        }
      } catch (error) {
        setAccessToken(null);

        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle authentication failure from response interceptor.
  useEffect(() => {
    registerAuthFailureHandler(() => {
      setAccessToken(null);
      setUser(null);

      window.location.href = "/login";
    });
  }, []);

  // LOGIN
  const login = async (credentials) => {
    const response = await loginUser(credentials);

    setAccessToken(response.accessToken);
    setUser(response.user);

    return response;
  };

  // LOGOUT
  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      setAccessToken(null);
      setUser(null);

      window.location.href = "/login";
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: Boolean(user),
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
