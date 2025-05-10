import { getOccupants } from '@/features/occupant/services/occupant';
import { usePaginated } from '@/hooks/usePaginated';
import type { ResidentHistoryEntry, OccupantsResponse } from '@/types/occupant';

export function useOccupants(initialPage = 1) {
  return usePaginated<ResidentHistoryEntry, OccupantsResponse>(
    getOccupants,
    (response) => ({
      data: response.data,
      meta: response.meta,
    }),
    initialPage
  );
}
