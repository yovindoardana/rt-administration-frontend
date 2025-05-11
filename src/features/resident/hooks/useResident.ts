import { useCallback } from 'react';
import { usePaginated } from '@/hooks/usePaginated';
import type { Resident } from '@/types/resident';
import type { PaginatedResponse } from '@/types/common';
import { residentService } from '../services/resident';

export function useResidents() {
  const selector = useCallback((res: PaginatedResponse<Resident>) => {
    return {
      data: res.data,
      meta: res.meta,
    };
  }, []);

  const { data: items, meta, setPage, loading, error, refetch: refresh } = usePaginated<Resident, PaginatedResponse<Resident>>(residentService.list, selector);

  return {
    items,
    meta,
    setPage,
    refresh,
    loading,
    error,
  };
}
