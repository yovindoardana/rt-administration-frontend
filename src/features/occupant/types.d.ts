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

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface OccupantsResponse {
  data: ResidentHistoryEntry[];
  meta: PaginationMeta;
}
