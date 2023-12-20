import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("authToken"));

  const login = (token) => {
    setIsAuthenticated(true);
    setToken(token);

    const expirationTime = new Date().getTime() + 12 * 60 * 60 * 1000; // 12 horas
    localStorage.setItem("authToken", token);
    localStorage.setItem("authTokenExpiration", expirationTime.toString());
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authTokenExpiration");
    localStorage.removeItem("cart");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const expirationTime = localStorage.getItem("authTokenExpiration");

    if (
      storedToken &&
      expirationTime &&
      new Date().getTime() < parseInt(expirationTime, 10)
    ) {
      // Comprueba si el token no ha expirado.
      setIsAuthenticated(true);
      setToken(storedToken);
    } else {
      // Si el token ha expirado, cierra la sesión.
      logout();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
