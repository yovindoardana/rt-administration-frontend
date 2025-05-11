// src/hooks/usePaginated.ts
import type { PaginationMeta } from '@/types/common';
import { useState, useEffect, useCallback } from 'react';

export interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
}

/**
 * Generic hook for paginated data.
 */
export function usePaginated<T, R>(fetcher: (page: number) => Promise<R>, selector: (res: R) => PaginatedResult<T>, initialPage = 1) {
  const [page, setPage] = useState(initialPage);
  const [data, setData] = useState<T[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({
    current_page: initialPage,
    from: 0,
    to: 0,
    last_page: 1,
    per_page: 0,
    total: 0,
    path: '',
    links: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPage = useCallback(() => {
    setLoading(true);
    setError(null);
    return fetcher(page)
      .then((res) => {
        const { data: list, meta } = selector(res);
        setData(list);
        setMeta(meta);
      })
      .catch((err) => setError(err.message ?? err.toString()))
      .finally(() => setLoading(false));
  }, [fetcher, selector, page]);

  useEffect(() => {
    fetchPage();
  }, [fetchPage]);

  return { page, setPage, data, meta, loading, error, refetch: fetchPage };
}
