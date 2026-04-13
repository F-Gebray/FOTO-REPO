import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, LoginFormData, RegisterFormData } from "../types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginFormData) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("arche_user");
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
    setIsLoading(false);
  }, []);

  const login = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise((r) => setTimeout(r, 800));
      const stored = localStorage.getItem(`arche_account_${data.email}`);
      if (!stored) throw new Error("No account found with this email address.");
      const account = JSON.parse(stored);
      if (account.password !== data.password) throw new Error("Incorrect password. Please try again.");
      const u: User = { id: account.id, firstName: account.firstName, lastName: account.lastName, email: account.email, createdAt: account.createdAt };
      setUser(u);
      if (data.rememberMe) localStorage.setItem("arche_user", JSON.stringify(u));
      else sessionStorage.setItem("arche_user", JSON.stringify(u));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Login failed.");
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise((r) => setTimeout(r, 800));
      const existing = localStorage.getItem(`arche_account_${data.email}`);
      if (existing) throw new Error("An account with this email already exists.");
      const account = { id: `user_${Date.now()}`, firstName: data.firstName, lastName: data.lastName, email: data.email, password: data.password, phone: data.phone, createdAt: new Date().toISOString() };
      localStorage.setItem(`arche_account_${data.email}`, JSON.stringify(account));
      const u: User = { id: account.id, firstName: account.firstName, lastName: account.lastName, email: account.email, createdAt: account.createdAt };
      setUser(u);
      localStorage.setItem("arche_user", JSON.stringify(u));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Registration failed.");
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("arche_user");
    sessionStorage.removeItem("arche_user");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
