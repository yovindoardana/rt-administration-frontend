import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { Table } from '@/components/ui/Table';
import { useHouses } from '../hooks/useHouses';
import { getHouseColumns } from './houseColumns';
import { Pagination } from '@/components/ui/Pagination';
import type { House } from '@/types';

interface Props {
  onEdit: (house: House) => void;
}

export function HouseTable({ onEdit }: Props) {
  const { items: houses, meta, setPage, loading, error } = useHouses();

  const table = useReactTable<House>({
    data: houses,
    columns: getHouseColumns(onEdit),
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <div>Loading…</div>;
  if (error) return <div className='text-red-600'>{error}</div>;
  if (!houses.length) return <div>Tidak ada rumah.</div>;

  return (
    <div className='mt-8 flow-root'>
      <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
          <div className='overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg'>
            <Table table={table} />
          </div>
          <Pagination meta={meta} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
}
