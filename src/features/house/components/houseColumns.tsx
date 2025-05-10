import type { House } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';

export const houseColumns: ColumnDef<House>[] = [
  { accessorKey: 'house_number', header: 'No. Rumah' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'created_at', header: 'Dibuat Pada', cell: (c) => new Date(c.getValue() as string).toLocaleDateString() },
  {
    id: 'actions',
    header: 'Aksi',
    accessorFn: (r) => r.id,
    cell: (info) => {
      const id = info.getValue<number>();
      return (
        <div className='flex space-x-2'>
          <a href={`/houses/${id}`} className='text-blue-600'>
            View
          </a>
          <a href={`/houses/${id}/edit`} className='text-green-600'>
            Edit
          </a>
        </div>
      );
    },
  },
];
