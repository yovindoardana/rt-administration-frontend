import { usePaginated } from '@/hooks/usePaginated';
import type { House, HousesResponse } from '@/types/house';
import { getHouses } from '../services/house';

export function useHouses(initialPage = 1) {
  return usePaginated<House, HousesResponse>(
    getHouses,
    (response) => ({
      data: response.data,
      meta: response.meta,
    }),
    initialPage
  );
}
