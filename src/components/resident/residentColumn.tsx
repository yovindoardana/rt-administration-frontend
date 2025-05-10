import { type ColumnDef } from '@tanstack/react-table';
import type { Resident } from '../../types/resident';

export const residentColumns: ColumnDef<Resident>[] = [
  {
    accessorKey: 'full_name',
    header: 'Nama Lengkap',
  },
  {
    accessorKey: 'phone',
    header: 'Telepon',
    cell: (info) => info.getValue() ?? '-',
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: (info) => info.getValue() ?? '-',
  },
  {
    accessorKey: 'created_at',
    header: 'Dibuat Pada',
    cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
  },
  {
    accessorFn: (row) => row.id,
    id: 'actions',
    header: 'Aksi',
    cell: (info) => {
      const id = info.getValue<number>();
      return (
        <div className='flex space-x-2'>
          <a href={`/residents/${id}`} className='text-blue-600 hover:underline'>
            View
          </a>
          <a href={`/residents/${id}/edit`} className='text-green-600 hover:underline'>
            Edit
          </a>
        </div>
      );
    },
  },
];
