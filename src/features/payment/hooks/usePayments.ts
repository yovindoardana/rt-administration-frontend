import { useCallback } from 'react';
import { usePaginated } from '@/hooks/usePaginated';
import type { PaymentEntry } from '@/types/payment';
import type { PaginatedResponse } from '@/types/common';
import { paymentService } from '../services/payment';

interface UsePaymentsParams {
  house_id: number;
  initialPage?: number;
}

export function usePayments({ house_id, initialPage = 1 }: UsePaymentsParams) {
  const fetcher = useCallback((page: number) => paymentService.list(house_id, page), [house_id]);

  const selector = useCallback(
    (res: PaginatedResponse<PaymentEntry>) => ({
      data: res.data,
      meta: res.meta,
    }),
    []
  );

  return usePaginated<PaymentEntry, PaginatedResponse<PaymentEntry>>(fetcher, selector, initialPage);
}
