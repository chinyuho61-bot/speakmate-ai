import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User, LearnerLevel, NativeLanguageId } from "@shared/types";
import { api, getToken, setToken } from "./api";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  updateProfile: (nativeLanguage: NativeLanguageId, level: LearnerLevel) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function bootstrap() {
      if (!getToken()) {
        setLoading(false);
        return;
      }
      try {
        const { user } = await api.me();
        if (!cancelled) setUser(user);
      } catch {
        setToken(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    bootstrap();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.login(email, password);
    setToken(res.token);
    setUser(res.user);
  };

  const register = async (email: string, password: string, name: string) => {
    const res = await api.register(email, password, name);
    setToken(res.token);
    setUser(res.user);
  };

  const updateProfile = async (nativeLanguage: NativeLanguageId, level: LearnerLevel) => {
    const res = await api.updateProfile(nativeLanguage, level);
    setUser(res.user);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
