import { createContext, useContext, useState, useEffect } from "react";

const baseURL =
  process.env.REACT_APP_BASE_URL || "http://rydo-backend.vercel.app";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const authorizationToken = `Bearer ${token}`;

  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
  };

  const LogoutUser = () => {
    setToken(""); // Clear the token state
    localStorage.removeItem("token"); // Remove the token from localStorage
    setUser(null); // Clear the user state
    setIsLoggedIn(false); // Ensure isLoggedIn reflects the logout
  };

  // Update isLoggedIn whenever the token changes
  useEffect(() => {
    setIsLoggedIn(!!token); // Update login status based on token presence
    if (token) {
      userAuthentication();
    } else {
      setUser(null);
    }
  }, [token]);

  const userAuthentication = async () => {
    if (!token) {
      console.log("No token found. User not authenticated.");
      setUser(null); // Clear user state if no token is found
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${baseURL}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else if (response.status === 401) {
        console.warn("Token expired or invalid. Logging out user.");
        LogoutUser(); // Logout if token is invalid or expired
      } else {
        console.error("Failed to fetch user data. Status:", response.status);
        setUser(null); // Clear user on error
      }
    } catch (error) {
      console.error("Error during user authentication:", error);
      setUser(null); // Clear user state on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        storeTokenInLS,
        LogoutUser,
        isLoggedIn,
        user,
        authorizationToken,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
