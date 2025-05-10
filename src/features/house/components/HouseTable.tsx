import { useMemo } from 'react';
import { useReactTable, getCoreRowModel, type ColumnDef, type CellContext } from '@tanstack/react-table';
import { Table } from '@/components/ui/Table';
import { houseColumns } from './houseColumns';
import { useHouses } from '../hooks/useHouses';
import type { House } from '@/types';

interface Props {
  onView?: (id: number) => void;
}

export function HouseTable({ onView }: Props) {
  const { items: houses, meta, page, setPage, loading, error } = useHouses();

  const columns = useMemo<ColumnDef<House, any>[]>(
    () =>
      houseColumns.map((col) =>
        col.id === 'actions'
          ? {
              ...col,
              cell: (ctx: CellContext<House, number>) => {
                const id = ctx.getValue();
                return (
                  <button onClick={() => onView?.(id)} className='text-blue-600 hover:underline'>
                    View
                  </button>
                );
              },
            }
          : col
      ),
    [onView]
  );

  const table = useReactTable<House>({
    data: houses,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <div>Loading…</div>;
  if (error) return <div className='text-red-600'>{error}</div>;
  if (!houses.length) return <div>Tidak ada rumah.</div>;

  return (
    <>
      <Table table={table} />
      <div className='flex items-center justify-between mt-4'>
        <button onClick={() => setPage(page - 1)} disabled={page <= 1} className='px-3 py-1 border rounded disabled:opacity-50'>
          Prev
        </button>
        <span>
          Halaman {meta.current_page} / {meta.last_page}
        </span>
        <button onClick={() => setPage(page + 1)} disabled={page >= meta.last_page} className='px-3 py-1 border rounded disabled:opacity-50'>
          Next
        </button>
      </div>
    </>
  );
}
