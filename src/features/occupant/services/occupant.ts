// src/features/occupant/services/occupant.ts
import api from '@/services/api';
import type { OccupantsResponse, ResidentHistoryEntry } from '../types';

/** Fetch paginated occupant history */
export const getOccupants = (page = 1) => api.get<OccupantsResponse>('/api/resident-house-histories', { params: { page } });

/** Tambah occupant baru */
export const addOccupant = (payload: { house_id: number; resident_id: number; start_date: string }) => api.post<{ data: ResidentHistoryEntry }>('/resident-house-histories', payload);

/** Akhiri occupant (set end_date) */
export const endOccupant = (id: number, payload: { end_date: string }) => api.put<{ data: ResidentHistoryEntry }>(`/resident-house-histories/${id}`, payload);
