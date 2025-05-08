import api from './api';
import type { ForgotPasswordPayload, LoginPayload, RegisterPayload, ResetPasswordPayload, User } from '../types/auth';

export const getCsrfCookie = () => api.get('/sanctum/csrf-cookie');

export const login = async (data: LoginPayload): Promise<{ user: User }> => {
  await getCsrfCookie();
  return api.post('/api/login', data).then((r) => r.data);
};

export const register = async (data: RegisterPayload): Promise<{ user: User }> => {
  await getCsrfCookie();
  return api.post('/api/register', data).then((r) => r.data);
};

export const logout = () => api.post('/api/logout');

export const fetchMe = async (): Promise<User> => api.get('/api/user').then((r) => r.data);

export const forgotPassword = async (data: ForgotPasswordPayload): Promise<{ status: string }> => api.post('/api/forgot-password', data).then((r) => r.data);

export const resetPassword = async (data: ResetPasswordPayload): Promise<{ status: string }> => api.post('/api/reset-password', data).then((r) => r.data);
