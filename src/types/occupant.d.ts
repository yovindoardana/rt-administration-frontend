import type { PaginatedResponse } from './common';

export interface ResidentHistoryEntry {
  id: number;
  house: { id: number; house_number: string };
  resident: { id: number; full_name: string };
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  created_at: string;
  updated_at: string;
}

export type OccupantsResponse = PaginatedResponse<ResidentHistoryEntry>;
export interface OccupantDetailResponse {
  data: ResidentHistoryEntry;
}

export interface CreateOccupantPayload {
  house_id: number;
  resident_id: number;
  start_date: string;
}
export interface UpdateOccupantPayload {
  end_date: string;
}
