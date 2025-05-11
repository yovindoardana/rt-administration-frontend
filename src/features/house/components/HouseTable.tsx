import { useMemo } from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { Table } from '@/components/ui/Table';
import { Pagination } from '@/components/ui/Pagination';
import type { House } from '@/types/house';
import { getHouseColumns } from './houseColumns';
import type { PaginationMeta } from '@/types/common';

interface Props {
  data: House[];
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
  onEdit: (house: House) => void;
  onRemove: (id: number) => void;
}

export function HouseTable({ data: houses, meta, onPageChange, onEdit, onRemove }: Props) {
  const columns = useMemo(() => getHouseColumns(onEdit, onRemove), [onEdit, onRemove]);

  const table = useReactTable<House>({
    data: houses,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='mt-8 flow-root'>
      <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
          <div className='overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg'>
            <Table table={table} />
          </div>
          <div className='mt-4 sm:px-6 lg:px-8'>
            <Pagination meta={meta} onPageChange={onPageChange} />
          </div>
        </div>
      </div>
    </div>
  );
}
