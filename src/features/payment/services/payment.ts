// src/features/payment/services/payment.ts
import api from '@/services/api';
import type { PaymentsResponse, PaymentEntry, CreatePaymentPayload, UpdatePaymentPayload } from '@/types/payment';

export const getPayments = (page = 1) => api.get<PaymentsResponse>('/api/payments', { params: { page } }).then((res) => res.data);

export const createPayment = (payload: CreatePaymentPayload) => api.post<{ data: PaymentEntry }>('/api/payments', payload).then((res) => res.data.data);

export const updatePayment = (id: number, payload: UpdatePaymentPayload) => api.put<{ data: PaymentEntry }>(`/api/payments/${id}`, payload).then((res) => res.data.data);
