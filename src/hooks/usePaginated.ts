import type { PaginationMeta } from '@/types';
import { useState, useEffect } from 'react';

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
}

/**
 * Generic hook for paginated data.
 */
export function usePaginated<T, R>(fetcher: (page: number) => Promise<R>, selector: (res: R) => PaginatedResult<T>, initialPage = 1) {
  const [page, setPage] = useState(initialPage);
  const [items, setItems] = useState<T[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({ current_page: 1, from: 0, to: 0, last_page: 1, per_page: 0, total: 0, path: '', links: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetcher(page)
      .then((res) => {
        const { data, meta } = selector(res);
        setItems(data);
        setMeta(meta);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [page]);

  return { page, setPage, items, meta, loading, error };
}
