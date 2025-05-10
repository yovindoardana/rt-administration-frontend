import api from '@/services/api';
import type { House, HouseDetail, HousesResponse, PaymentEntry, ResidentHistoryEntry } from '@/types';

export const getHouses = (page = 1) => api.get<HousesResponse>('/api/houses', { params: { page } }).then((res) => res.data);
export const getHouse = (id: number) => api.get<{ data: HouseDetail }>(`/api/houses/${id}`).then((res) => res.data.data);
export const createHouse = (payload: Omit<House, 'id' | 'created_at' | 'updated_at'>) => api.post<{ data: House }>('/api/houses', payload).then((res) => res.data.data);
export const updateHouse = (id: number, payload: Partial<Omit<House, 'id' | 'created_at' | 'updated_at'>>) => api.put<{ data: House }>(`/api/houses/${id}`, payload).then((res) => res.data.data);
export const deleteHouse = (id: number) => api.delete(`/api/houses/${id}`);

export const addOccupant = (houseId: number, payload: { resident_id: number; start_date: string }) => api.post<{ data: ResidentHistoryEntry }>(`/api/houses/${houseId}/occupants`, payload).then((res) => res.data.data);
export const endOccupant = (houseId: number, historyId: number, payload: { end_date: string }) => api.put<{ data: ResidentHistoryEntry }>(`/api/houses/${houseId}/occupants/${historyId}`, payload).then((res) => res.data.data);
export const getPayments = (houseId: number) => api.get<{ data: PaymentEntry[] }>(`/api/houses/${houseId}/payments`).then((res) => res.data.data);
export const createPayment = (houseId: number, payload: { resident_id: number; amount: number; payment_date: string; status: 'paid' | 'unpaid' }) => api.post<{ data: PaymentEntry }>(`/api/houses/${houseId}/payments`, payload).then((res) => res.data.data);
export const updatePayment = (houseId: number, paymentId: number, payload: { status: 'paid' | 'unpaid' }) => api.put<{ data: PaymentEntry }>(`/api/houses/${houseId}/payments/${paymentId}`, payload).then((res) => res.data.data);
