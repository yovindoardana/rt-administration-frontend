import { useState, useEffect } from 'react';
import { getHouses } from '@/services/house';
import type { House, HousesResponse, PaginationMeta } from '@/types/house';

export function useHouses(initialPage = 1) {
  const [page, setPage] = useState<number>(initialPage);
  const [houses, setHouses] = useState<House[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({ current_page: 0, last_page: 0, per_page: 0, total: 0 });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getHouses(page)
      .then((res: HousesResponse) => {
        setHouses(res.data);
        setMeta(res.meta);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [page]);

  return { page, setPage, houses, meta, loading, error };
}
