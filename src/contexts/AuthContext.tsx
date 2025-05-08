import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, LoginPayload, RegisterPayload } from '@/types/auth';
import * as authService from '@/services/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginPayload) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
    if (!token) {
      setLoading(false);
      return;
    }

    authService
      .fetchMe()
      .then((u) => setUser(u))
      .catch((err: any) => {
        if (err.response?.status !== 401) {
          console.error(err);
        }
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (data: LoginPayload) => {
    const { user: u, token } = (await authService.login(data)) as { user: User; token: string };

    localStorage.setItem('auth_token', token);
    setUser(u);
  };

  const register = async (data: RegisterPayload) => {
    const { user: u, token } = (await authService.register(data)) as { user: User; token: string };
    localStorage.setItem('auth_token', token);
    setUser(u);
  };

  const logout = async () => {
    await authService.logout();
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_token');
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
