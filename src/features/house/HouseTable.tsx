import { useMemo } from 'react';
import { useReactTable, getCoreRowModel, type CellContext, type ColumnDef } from '@tanstack/react-table';
import { Table } from '@/components/ui/Table';
import { useHouses } from '@/hooks/useHouses';
import { houseColumns } from './houseColumns';
import type { House } from '@/types/house';
import { useNavigate } from 'react-router-dom';

interface HouseTableProps {
  onView?: (id: number) => void;
}

export function HouseTable({ onView }: HouseTableProps) {
  const { page, setPage, houses, meta, loading, error } = useHouses();
  const navigate = useNavigate();

  const columns = useMemo<ColumnDef<House, any>[]>(() => {
    return houseColumns.map((col) => {
      if (col.id === 'actions') {
        return {
          ...col,
          cell: (info: CellContext<House, number>) => {
            const id = info.getValue();
            return (
              <button onClick={() => navigate(`/houses/${id}`)} className='text-blue-600 hover:underline'>
                View
              </button>
            );
          },
        };
      }
      return col;
    });
  }, [onView]);

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
