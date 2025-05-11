import type { ColumnDef } from '@tanstack/react-table';
import type { Resident } from '@/types/resident';
import { PencilIcon } from '@heroicons/react/24/solid';

export function getResidentColumns(onEdit: (r: Resident) => void): ColumnDef<Resident>[] {
  return [
    { accessorKey: 'full_name', header: 'Nama Lengkap' },
    { accessorKey: 'residency_status', header: 'Status Tinggal' },
    { accessorKey: 'phone_number', header: 'No. Telepon' },
    { accessorKey: 'marital_status', header: 'Status Pernikahan' },
    {
      id: 'actions',
      header: 'Aksi',
      cell: ({ row }) => {
        const r = row.original;
        return (
          <div className='flex space-x-2'>
            <button onClick={() => onEdit(r)} className='px-2 py-1 bg-green-50 text-green-600 rounded'>
              <PencilIcon className='h-4 w-4' />
            </button>
          </div>
        );
      },
      enableSorting: false,
      enableColumnFilter: false,
    },
  ];
}
