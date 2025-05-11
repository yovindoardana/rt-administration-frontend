import { useMemo } from 'react';
import { useReactTable, getCoreRowModel, type CellContext, type ColumnDef } from '@tanstack/react-table';
import { Table } from '@/components/ui/Table';
import type { ResidentHistoryEntry } from '@/types/occupant';
import { occupantColumns } from './occupantColumns';
import { endOccupant } from '../services/occupant';
import { useOccupants } from '../hooks/useOccupant';
import { Pagination } from '@/components/ui/Pagination';

export function OccupantTable() {
  const { items, meta, setPage, loading, error } = useOccupants();

  const columns = useMemo<ColumnDef<ResidentHistoryEntry, any>[]>(
    () =>
      occupantColumns.map((col) =>
        col.id === 'actions'
          ? {
              ...col,
              cell: (ctx: CellContext<ResidentHistoryEntry, number>) => {
                const id = ctx.getValue();
                return (
                  <button
                    onClick={() =>
                      endOccupant(id, {
                        end_date: new Date().toISOString().split('T')[0],
                      })
                    }
                    className='px-2 py-1 bg-red-500 text-white rounded'>
                    Akhiri
                  </button>
                );
              },
            }
          : col
      ),
    []
  );

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
      <Pagination meta={meta} onPageChange={setPage} />
    </>
  );
}
