// src/hooks/useResidentDetail.ts
import { useState, useEffect } from 'react';
import { getResidentDetail } from '@/features/resident/services/resident';
import type { Resident } from '@/types/resident';

export function useResidentDetail(id: number | null) {
  const [resident, setResident] = useState<Resident | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id === null) return;
    setLoading(true);
    getResidentDetail(id)
      .then((data) => setResident(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { resident, loading, error };
}
