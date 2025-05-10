import type { ColumnDef } from '@tanstack/react-table';
import type { Resident } from '@/types/resident';

export const residentColumns: ColumnDef<Resident>[] = [
  { accessorKey: 'full_name', header: 'Nama Lengkap' },
  { accessorKey: 'residency_status', header: 'Status Tinggal' },
  { accessorKey: 'phone_number', header: 'No. Telepon' },
  { accessorKey: 'marital_status', header: 'Status Pernikahan' },
  {
    id: 'actions',
    header: 'Aksi',
    accessorFn: (row) => row.id,
    cell: (ctx) => {
      const id = ctx.getValue();
      return (
        <div className='flex space-x-2'>
          <button
            onClick={() => {
              /* nanti override di table */
            }}
            className='text-blue-600 hover:underline'>
            View
          </button>
        </div>
      );
    },
  },
];
