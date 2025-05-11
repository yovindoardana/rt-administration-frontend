import { useCallback } from 'react';
import { usePaginated } from '@/hooks/usePaginated';
import type { House, CreateHousePayload } from '@/types/house';
import type { PaginatedResponse } from '@/types/common';
import { houseService } from '../services/house';

interface UseHousesParams {
  initialPage?: number;
}

export function useHouses({ initialPage = 1 }: UseHousesParams = {}) {
  const fetcher = useCallback((page: number) => houseService.list(page), []);
  const selector = useCallback(
    (res: PaginatedResponse<House>) => ({
      data: res.data,
      meta: res.meta,
    }),
    []
  );

  const { data, meta, page, setPage, loading, error, refetch } = usePaginated<House, PaginatedResponse<House>>(fetcher, selector, initialPage);

  async function onCreate(payload: CreateHousePayload) {
    await houseService.create(payload);
    await refetch();
  }

  async function onUpdate(id: number, payload: CreateHousePayload) {
    await houseService.update(id, payload);
    await refetch();
  }

  async function onRemove(id: number) {
    await houseService.remove(id);
    await refetch();
  }

  return {
    data,
    meta,
    page,
    setPage,
    loading,
    error,
    refetch,
    onCreate,
    onUpdate,
    onRemove,
  };
}
