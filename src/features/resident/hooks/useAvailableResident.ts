import { useQuery } from '@tanstack/react-query';
import type { Resident } from '@/types/resident';
import { residentService } from '../services/resident';

export function useAvailableResidents() {
  return useQuery<Resident[], Error>({
    queryKey: ['residents', 'available'],
    queryFn: residentService.available,
  });
}
