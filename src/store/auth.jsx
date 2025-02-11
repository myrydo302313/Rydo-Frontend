import { createContext, useContext, useState, useEffect } from "react";

const baseURL =
  process.env.REACT_APP_BASE_URL || "http://rydo-backend.vercel.app";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // User authentication state
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(!!userToken);
  const [user, setUser] = useState(null);

  // Captain authentication state
  const [captainToken, setCaptainToken] = useState(
    localStorage.getItem("captainToken")
  );
  const [isCaptainLoggedIn, setIsCaptainLoggedIn] = useState(!!captainToken);
  const [captain, setCaptain] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const userAuthToken = `Bearer ${userToken}`;
  const captainAuthToken = `Bearer ${captainToken}`;

  // Store tokens in Local Storage
  const storeUserToken = (token) => {
    localStorage.setItem("userToken", token);
    setUserToken(token);
  };

  const storeCaptainToken = (token) => {
    localStorage.setItem("captainToken", token);
    setCaptainToken(token);
  };

  // Logout functions
  const logoutUser = () => {
    setUserToken("");
    localStorage.removeItem("userToken");
    setUser(null);
    setIsUserLoggedIn(false);
  };

  const logoutCaptain = () => {
    setCaptainToken("");
    localStorage.removeItem("captainToken");
    setCaptain(null);
    setIsCaptainLoggedIn(false);
  };

  // Update login status when tokens change
  useEffect(() => {
    setIsUserLoggedIn(!!userToken);
    setIsCaptainLoggedIn(!!captainToken);

    if (userToken) {
      authenticateUser();
    } else {
      setUser(null);
    }

    if (captainToken) {
      authenticateCaptain();
    } else {
      setCaptain(null);
    }
  }, [userToken, captainToken]);

  // User authentication function
  const authenticateUser = async () => {
    if (!userToken) {
      console.log("No user token found. User not authenticated.");
      setUser(null);
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${baseURL}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: userAuthToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else if (response.status === 401) {
        console.warn("User token expired or invalid. Logging out user.");
        logoutUser();
      } else {
        console.error("Failed to fetch user data. Status:", response.status);
        setUser(null);
      }
    } catch (error) {
      console.error("Error during user authentication:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Captain authentication function
  const authenticateCaptain = async () => {
    if (!captainToken) {
      console.log("No captain token found. Captain not authenticated.");
      setCaptain(null);
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${baseURL}/api/auth/captain`, {
        method: "GET",
        headers: {
          Authorization: captainAuthToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCaptain(data);
      } else if (response.status === 401) {
        console.warn("Captain token expired or invalid. Logging out captain.");
        logoutCaptain();
      } else {
        console.error("Failed to fetch captain data. Status:", response.status);
        setCaptain(null);
      }
    } catch (error) {
      console.error("Error during captain authentication:", error);
      setCaptain(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        storeUserToken,
        storeCaptainToken,
        logoutUser,
        logoutCaptain,
        isUserLoggedIn,
        isCaptainLoggedIn,
        user,
        captain,
        userAuthToken,
        captainAuthToken,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for authentication
export const useAuth = () => {
  return useContext(AuthContext);
};
