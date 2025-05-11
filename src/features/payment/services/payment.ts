// src/features/payment/services/paymentService.ts
import api from '@/services/api';
import type { PaymentEntry } from '@/types/payment';
import type { PaginatedResponse } from '@/types/common';

export const paymentService = {
  list(houseId: number, page: number) {
    return api.get<PaginatedResponse<PaymentEntry>>(`/api/houses/${houseId}/payments`, { params: { page } }).then((res) => res.data);
  },
  create(
    houseId: number,
    payload: {
      resident_id: number;
      amount: number;
      payment_date: string;
      status: 'paid' | 'unpaid';
    }
  ) {
    return api.post<PaymentEntry>(`/api/houses/${houseId}/payments`, payload).then((res) => res.data);
  },
  updateStatus(paymentId: number, status: 'paid' | 'unpaid') {
    return api.patch<PaymentEntry>(`/api/payments/${paymentId}`, { status }).then((res) => res.data);
  },
};
