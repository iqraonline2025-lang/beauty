"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Configure Axios defaults globally so you don't have to repeat them in AuthForm or Navbar
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
axios.defaults.withCredentials = true;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Check Auth Status
  const checkAuthStatus = async () => {
    try {
      // Note: Make sure your backend response matches this 'data.success' check
      const { data } = await axios.get("/api/auth/login/success");
      
      if (data.success || data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Auth check failed:", err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // 2. Global Logout function
  const logout = async () => {
    try {
      await axios.post("/api/auth/logout"); // Hits your passport logout route
      setUser(null);
      window.location.href = "/login"; // Force redirect to login
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser, logout, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};