import { useMemo } from 'react';
import { useReactTable, getCoreRowModel, type ColumnDef, type CellContext } from '@tanstack/react-table';
import { Table } from '@/components/ui/Table';
import type { Resident } from '@/types/resident';
import { useResidents } from '../hooks/useResident';
import { residentColumns } from './residentColumn';

interface Props {
  onView?: (id: number) => void;
}

export function ResidentTable({ onView }: Props) {
  const { items: residents, meta, page, setPage, loading, error } = useResidents();

  const columns = useMemo<ColumnDef<Resident, any>[]>(
    () =>
      residentColumns.map((col) =>
        col.id === 'actions'
          ? {
              ...col,
              cell: (ctx: CellContext<Resident, number>) => {
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

  const table = useReactTable<Resident>({
    data: residents,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <div>Loading…</div>;
  if (error) return <div className='text-red-600'>{error}</div>;
  if (!residents.length) return <div>Tidak ada penghuni.</div>;

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
