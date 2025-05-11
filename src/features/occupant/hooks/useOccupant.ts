import { useCallback } from 'react';
import { usePaginated } from '@/hooks/usePaginated';
import type { ResidentHistoryEntry } from '@/types/occupant';
import type { PaginatedResponse } from '@/types/common';
import { occupantService } from '../services/occupant';

interface UseOccupantsParams {
  house_id: number;
  initialPage?: number;
}

export function useOccupants({ house_id, initialPage = 1 }: UseOccupantsParams) {
  const fetcher = useCallback((page: number) => occupantService.list(house_id, page), [house_id]);

  const selector = useCallback(
    (res: PaginatedResponse<ResidentHistoryEntry>) => ({
      data: res.data,
      meta: res.meta,
    }),
    []
  );

  return usePaginated<ResidentHistoryEntry, PaginatedResponse<ResidentHistoryEntry>>(fetcher, selector, initialPage);
}
