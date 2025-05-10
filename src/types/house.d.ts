import type { PaginatedResponse } from './common';
import type { ResidentHistoryEntry } from './occupant';
import type { PaymentEntry } from './payment';

export interface House {
  id: number;
  house_number: string;
  status: 'vacant' | 'occupied';
  created_at: string;
  updated_at: string;
}

export interface HouseDetail extends House {
  is_occupied: boolean;
  current_resident: { id: number; full_name: string } | null;
  occupant_history: ResidentHistoryEntry[];
  payment_history: PaymentEntry[];
}

export type HousesResponse = PaginatedResponse<House>;
export interface HouseDetailResponse {
  data: HouseDetail;
}
export interface CreateHousePayload {
  house_number: string;
  status: 'vacant' | 'occupied';
}

export type UpdateHousePayload = Partial<CreateHousePayload>;
