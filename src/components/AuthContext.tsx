"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
  login: () => false,
  logout: () => {},
});

// Simple admin credentials - in production, use a proper auth system
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "minhphuong2024";

// Session timeout: 10 minutes in milliseconds
const SESSION_TIMEOUT_MS = 10 * 60 * 1000;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("mp_admin_auth");
    const loginTime = localStorage.getItem("mp_admin_login_time");

    if (stored === "true" && loginTime) {
      const elapsed = Date.now() - parseInt(loginTime, 10);
      if (elapsed < SESSION_TIMEOUT_MS) {
        setIsAdmin(true);
      } else {
        // Session expired — clear auth
        localStorage.removeItem("mp_admin_auth");
        localStorage.removeItem("mp_admin_login_time");
      }
    } else if (stored === "true") {
      // Legacy entry without timestamp — clear it
      localStorage.removeItem("mp_admin_auth");
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem("mp_admin_auth", "true");
      localStorage.setItem("mp_admin_login_time", Date.now().toString());
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem("mp_admin_auth");
    localStorage.removeItem("mp_admin_login_time");
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
