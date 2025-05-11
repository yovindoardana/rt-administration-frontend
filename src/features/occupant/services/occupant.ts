// src/features/occupant/services/occupantService.ts
import api from '@/services/api';
import type { ResidentHistoryEntry } from '@/types/occupant';
import type { PaginatedResponse } from '@/types/common';

export const occupantService = {
  list(houseId: number, page: number) {
    return api.get<PaginatedResponse<ResidentHistoryEntry>>(`/api/houses/${houseId}/occupants`, { params: { page } }).then((res) => res.data);
  },
  create(houseId: number, payload: { resident_id: number; start_date: string }) {
    return api.post<ResidentHistoryEntry>(`/api/houses/${houseId}/occupants`, payload).then((res) => res.data);
  },
  end(historyId: number, end_date: string) {
    return api.patch<ResidentHistoryEntry>(`/api/resident-house-histories/${historyId}`, { end_date }).then((res) => res.data);
  },
};
