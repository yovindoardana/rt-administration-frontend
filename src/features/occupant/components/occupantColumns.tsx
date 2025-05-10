// src/features/occupant/components/occupantColumns.tsx
import type { ColumnDef } from '@tanstack/react-table';
import type { ResidentHistoryEntry } from '../types';

export const occupantColumns: ColumnDef<ResidentHistoryEntry>[] = [
  {
    accessorFn: (row) => row.house.house_number,
    id: 'house',
    header: 'No. Rumah',
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.resident.full_name,
    id: 'resident',
    header: 'Penghuni',
    cell: (info) => info.getValue(),
  },
  { accessorKey: 'start_date', header: 'Mulai' },
  { accessorKey: 'end_date', header: 'Selesai', cell: (info) => info.getValue() ?? '-' },
  {
    accessorKey: 'is_current',
    header: 'Status',
    cell: (info) => (info.getValue<boolean>() ? 'Aktif' : 'Selesai'),
  },
  {
    id: 'actions',
    header: 'Aksi',
    accessorFn: (row) => row.id,
    cell: (info) => {
      const id = info.getValue() as number;
      return (
        <button
          onClick={() => {
            /* akan kita override di component */
          }}
          className='text-red-600'>
          Selesai
        </button>
      );
    },
  },
];
