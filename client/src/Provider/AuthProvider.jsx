import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, _setToken] = useState(localStorage.getItem("token") || null);
  const [user, _setUser] = useState(null);
  const [isAuthenticated, _setIsAuthenticated] = useState(false);

  const setToken = (newToken) => {
    _setToken(newToken);
  };

  const setUser = (newUser) => {
    _setUser(newUser);
  };
  const setIsAuthenticated = (value) => {
    _setIsAuthenticated(value);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      user,
      setUser,
      isAuthenticated,
      setIsAuthenticated,
    }),
    [token, user, isAuthenticated]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
