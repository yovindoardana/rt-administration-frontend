import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateHousePayload, House } from '@/types/house';
import { createHouse } from '../services/house';

export function useCreateHouse() {
  const qc = useQueryClient();
  return useMutation<House, Error, CreateHousePayload>({
    mutationFn: createHouse,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['houses'] }),
  });
}
