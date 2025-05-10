import { getPayments } from '@/features/payment/services/payment';
import { usePaginated } from '@/hooks/usePaginated';
import type { PaymentEntry, PaymentsResponse } from '@/types/payment';

export function usePayments(initialPage = 1) {
  return usePaginated<PaymentEntry, PaymentsResponse>(
    getPayments,
    (response) => ({
      data: response.data,
      meta: response.meta,
    }),
    initialPage
  );
}
