import type { PaginatedResponse } from './common';

export interface PaymentEntry {
  id: number;
  house: { id: number; house_number: string };
  resident: { id: number; full_name: string };
  fee_type: string;
  month: number;
  year: number;
  duration_months: number;
  amount: number;
  status: 'paid' | 'unpaid' | string;
  payment_date: string;
  created_at: string;
  updated_at: string;
}

export type PaymentsResponse = PaginatedResponse<PaymentEntry>;
export interface PaymentDetailResponse {
  data: PaymentEntry;
}

export interface CreatePaymentPayload {
  house_id: number;
  resident_id: number;
  fee_type: string;
  month: number;
  year: number;
  duration_months: number;
  amount: number;
  payment_date: string;
  status: 'paid' | 'unpaid';
}
export interface UpdatePaymentPayload {
  status: 'paid' | 'unpaid';
}
