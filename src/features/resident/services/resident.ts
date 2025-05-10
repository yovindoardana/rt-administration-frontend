// src/features/resident/services/resident.ts
import api from '@/services/api';
import type { ResidentsResponse, ResidentDetailResponse, Resident, CreateResidentPayload, UpdateResidentPayload } from '@/types/resident';

export const getResidents = (page = 1) => api.get<ResidentsResponse>('/api/residents', { params: { page } }).then((res) => res.data);

export const getResidentDetail = (id: number) => api.get<ResidentDetailResponse>(`/api/residents/${id}`).then((res) => res.data.data);

export const createResident = (payload: CreateResidentPayload) => api.post<{ data: Resident }>('/api/residents', payload).then((res) => res.data.data);

export const updateResident = (id: number, payload: UpdateResidentPayload) => api.put<{ data: Resident }>(`/api/residents/${id}`, payload).then((res) => res.data.data);

export const deleteResident = (id: number) => api.delete(`/api/residents/${id}`);
