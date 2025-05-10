import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateHousePayload, House } from '@/types/house';
import { updateHouse } from '../services/house';

export function useUpdateHouse() {
  const qc = useQueryClient();
  return useMutation<House, Error, { id: number; data: CreateHousePayload }>({
    mutationFn: ({ id, data }) => updateHouse(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['houses'] }),
  });
}
