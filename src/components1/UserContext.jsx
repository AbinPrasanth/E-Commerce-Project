import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("token"));

  const loginUser = async (email, password) => {
    try {
      const res = await axios.post("https://localhost:7072/api/Auth/login", {
        email,
        password,
      });

      const { token, role, userId, email: userEmail, fullName } = res.data.data;

      const userObj = { id: userId, role, email: userEmail, fullName };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userObj));

      setToken(token);
      setCurrentUser(userObj);
      setIsAuthenticated(true);

      return { success: true, role }; // return role so the caller can redirect accordingly
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      return { success: false, error: error.response?.data?.message || "Login failed" };
    }
  };

  const registerUser = async (userData) => {
    try {
      await axios.post("https://localhost:7072/api/Auth/register", userData, {
        headers: { "Content-Type": "application/json" },
      });

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        loginUser,
        registerUser,
        logoutUser,
        token,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
