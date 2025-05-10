// src/features/occupant/components/occupantColumns.tsx
import type { ColumnDef } from '@tanstack/react-table';
import type { ResidentHistoryEntry } from '@/types/occupant';

export const occupantColumns: ColumnDef<ResidentHistoryEntry>[] = [
  {
    accessorFn: (r) => r.house.house_number,
    id: 'house',
    header: 'No. Rumah',
  },
  {
    accessorFn: (r) => r.resident.full_name,
    id: 'resident',
    header: 'Penghuni',
  },
  { accessorKey: 'start_date', header: 'Mulai' },
  {
    accessorKey: 'end_date',
    header: 'Selesai',
    cell: (info) => info.getValue<string | null>() ?? '-',
  },
  {
    accessorKey: 'is_current',
    header: 'Status',
    cell: (info) => (info.getValue<boolean>() ? 'Aktif' : 'Selesai'),
  },
  {
    id: 'actions',
    header: 'Aksi',
    accessorFn: (r) => r.id,
    cell: () => null, // di‐override di component
  },
];
