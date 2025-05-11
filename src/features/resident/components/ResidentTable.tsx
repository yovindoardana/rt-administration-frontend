import { useMemo } from 'react';
import { useReactTable, getCoreRowModel, type ColumnDef, type CellContext } from '@tanstack/react-table';
import { Table } from '@/components/ui/Table';
import type { Resident } from '@/types/resident';
import { useResidents } from '../hooks/useResident';
import { residentColumns } from './residentColumn';
import { Pagination } from '@/components/ui/Pagination';

interface Props {
  onView?: (id: number) => void;
}

export function ResidentTable({ onView }: Props) {
  const { items: residents, meta, setPage, loading, error } = useResidents();

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
      <Pagination meta={meta} onPageChange={setPage} />
    </>
  );
}
