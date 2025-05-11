import { useMemo } from 'react';
import { useReactTable, getCoreRowModel, type ColumnDef } from '@tanstack/react-table';
import { Table } from '@/components/ui/Table';
import { useOccupants } from '../hooks/useOccupant';
import type { ResidentHistoryEntry } from '@/types/occupant';
import { occupantService } from '../services/occupant';

interface Props {
  houseId: number;
}

export function OccupantTable({ houseId }: Props) {
  const { data, meta, page, setPage, loading, error, refetch } = useOccupants({ house_id: houseId });

  const columns = useMemo<ColumnDef<ResidentHistoryEntry>[]>(
    () => [
      {
        accessorFn: (row) => row.resident.full_name,
        id: 'full_name',
        header: 'Nama',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'start_date',
        header: 'Mulai',
        cell: (info) => info.getValue() ?? '-',
      },
      {
        accessorKey: 'end_date',
        header: 'Selesai',
        cell: (info) => info.getValue() ?? '-',
      },
      {
        accessorKey: 'is_current',
        header: 'Status',
        cell: (info) => (info.getValue() ? 'Saat Ini' : 'Selesai'),
      },
      {
        id: 'aksi',
        header: 'Aksi',
        cell: ({ row }) =>
          row.original.is_current ? (
            <button
              onClick={async () => {
                await occupantService.end(row.original.id, new Date().toISOString().split('T')[0]);
                refetch();
              }}
              className='px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600'>
              Selesai
            </button>
          ) : null,
      },
    ],
    [refetch]
  );

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <div>Loading…</div>;
  if (error) return <div className='text-red-600'>{error}</div>;

  return (
    <>
      <div className='overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg'>
        <Table table={table} />
      </div>

      {/* Pagination Controls */}
      <div className='mt-4 flex items-center justify-between'>
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
