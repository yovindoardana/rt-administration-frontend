// src/features/occupant/services/occupant.ts
import api from '@/services/api';
import type { OccupantsResponse, ResidentHistoryEntry, CreateOccupantPayload, UpdateOccupantPayload } from '@/types/occupant';

export const getOccupants = (page = 1) => api.get<OccupantsResponse>('/api/resident-house-histories', { params: { page } }).then((res) => res.data);

export const addOccupant = (payload: CreateOccupantPayload) => api.post<{ data: ResidentHistoryEntry }>('/api/resident-house-histories', payload).then((res) => res.data.data);

export const endOccupant = (id: number, payload: UpdateOccupantPayload) => api.put<{ data: ResidentHistoryEntry }>(`/api/resident-house-histories/${id}`, payload).then((res) => res.data.data);
