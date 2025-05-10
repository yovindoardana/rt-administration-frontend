// import api from './api';
// import type { Resident, ResidentsResponse } from '../features/resident/resident';

import api from '@/services/api';
import type { Resident, ResidentsResponse } from '../resident';

export const fetchResidents = (page = 1) => api.get<ResidentsResponse>(`/api/residents?page=${page}`);
export const fetchResident = (id: number) => api.get<Resident>(`/api/residents/${id}`);
export const createResident = (data: Partial<Resident>) => api.post<Resident>('/api/residents', data);
export const updateResident = (id: number, data: Partial<Resident>) => api.put<Resident>(`/api/residents/${id}`, data);
export const deleteResident = (id: number) => api.delete<void>(`/api/residents/${id}`);
