import { useMemo } from 'react';
import { useReactTable, getCoreRowModel, type CellContext } from '@tanstack/react-table';
import { Table } from '@/components/ui/Table';

import { occupantColumns } from './occupantColumns';
import type { ResidentHistoryEntry } from '../types';
import { endOccupant } from '../services/occupant';
import { useOccupants } from '../hooks/useOccupant';

export function OccupantTable() {
  const { page, setPage, items, meta, loading, error } = useOccupants();

  const columns = useMemo(() => {
    return occupantColumns.map((col) => {
      if (col.id === 'actions') {
        return {
          ...col,
          cell: (info: CellContext<ResidentHistoryEntry, number>) => {
            const historyId = info.getValue();
            return (
              <button onClick={() => endOccupant(historyId, { end_date: new Date().toISOString().split('T')[0] })} className='px-2 py-1 bg-red-500 text-white rounded'>
                Akhiri
              </button>
            );
          },
        };
      }
      return col;
    });
  }, []);

  const table = useReactTable<ResidentHistoryEntry>({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <div>Loading…</div>;
  if (error) return <div className='text-red-600'>{error}</div>;
  if (!items.length) return <div>Tidak ada riwayat penghuni.</div>;

  return (
    <>
      <Table table={table} />
      <div className='flex items-center justify-between mt-4'>
        <button onClick={() => setPage(page - 1)} disabled={page <= 1} className='px-3 py-1 border rounded'>
          Prev
        </button>
        <span>
          Halaman {meta.current_page} / {meta.last_page}
        </span>
        <button onClick={() => setPage(page + 1)} disabled={page >= meta.last_page} className='px-3 py-1 border rounded'>
          Next
        </button>
      </div>
    </>
  );
}
