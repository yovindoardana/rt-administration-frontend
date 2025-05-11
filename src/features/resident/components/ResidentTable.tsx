import { useMemo } from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { Table } from '@/components/ui/Table';
import { Pagination } from '@/components/ui/Pagination';
import type { Resident } from '@/types/resident';
import { useResidents } from '../hooks/useResident';
import { getResidentColumns } from './residentColumn';

interface Props {
  onEdit: (resident: Resident) => void;
}

export function ResidentTable({ onEdit }: Props) {
  const { items, meta, setPage, loading, error } = useResidents();

  const columns = useMemo(() => getResidentColumns(onEdit), [onEdit]);

  const table = useReactTable<Resident>({
    data: items,
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
            <Pagination meta={meta} onPageChange={setPage} />
          </div>
        </div>
      </div>
    </div>
  );
}
