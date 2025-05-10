// src/features/occupant/hooks/useOccupants.ts
import { useState, useEffect } from 'react';
import { getOccupants } from '../services/occupant';
import type { ResidentHistoryEntry, PaginationMeta } from '../types';

export function useOccupants(initialPage = 1) {
  const [page, setPage] = useState<number>(initialPage);
  const [items, setItems] = useState<ResidentHistoryEntry[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({
    current_page: 1,
    last_page: 1,
    per_page: 0,
    total: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getOccupants(page)
      .then((res) => {
        setItems(res.data.data);
        setMeta(res.data.meta);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [page]);

  return { page, setPage, items, meta, loading, error };
}
