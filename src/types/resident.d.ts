import type { PaginatedResponse } from './common';

export interface Resident {
  id: number;
  full_name: string;
  id_card: string | null;
  residency_status: 'permanent' | 'contract' | string;
  phone_number: string;
  marital_status: 'married' | 'single' | string;
  created_at: string;
  updated_at: string;
}

export type ResidentsResponse = PaginatedResponse<Resident>;
export interface ResidentDetailResponse {
  data: Resident;
}

export interface CreateResidentPayload {
  full_name: string;
  id_card?: string | null;
  residency_status: 'permanent' | 'contract' | string;
  phone_number: string;
  marital_status: 'married' | 'single' | string;
}
export type UpdateResidentPayload = Partial<CreateResidentPayload>;
