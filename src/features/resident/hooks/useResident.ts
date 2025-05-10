import { useState, useEffect } from 'react';
import * as svc from '../services/resident';
import type { Resident, ResidentsResponse, PaginationLinks, PaginationMeta } from '../types/resident';

export function useResidents(initialPage = 1) {
  const [page, setPage] = useState<number>(initialPage);
  const [residents, setResidents] = useState<Resident[]>([]);
  const [links, setLinks] = useState<PaginationLinks>({
    first: '',
    last: '',
    prev: null,
    next: null,
  });
  const [meta, setMeta] = useState<PaginationMeta>({
    current_page: 1,
    from: 0,
    last_page: 1,
    links: [],
    path: '',
    per_page: 0,
    to: 0,
    total: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    svc
      .fetchResidents(page)
      .then((res) => {
        const payload = res.data as ResidentsResponse;
        setResidents(payload.data);
        setLinks(payload.links);
        setMeta(payload.meta);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [page]);

  return { page, setPage, residents, links, meta, loading, error };
}
