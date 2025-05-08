import api from './api';
import type { DashboardData } from '@/types/dashboard';

export const getDashboardData = async (year?: number, month?: number): Promise<DashboardData> => {
  const params: Record<string, number> = {};
  if (year) params.year = year;
  if (month) params.month = month;

  // Consume Dashboard API
  const response = await api.get<DashboardData>('/api/dashboard', { params });
  return response.data;
};
