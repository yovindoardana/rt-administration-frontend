// import { usePaginated } from './usePaginated';
import { getResidents } from '@/features/resident/services/resident';
import { usePaginated } from '@/hooks/usePaginated';
import type { Resident, ResidentsResponse } from '@/types/resident';

export function useResidents(initialPage = 1) {
  return usePaginated<Resident, ResidentsResponse>(
    getResidents,
    (response) => ({
      data: response.data,
      meta: response.meta,
    }),
    initialPage
  );
}
