// src/features/payment/components/paymentColumns.tsx
import type { ColumnDef } from '@tanstack/react-table';
import type { PaymentEntry } from '@/types/payment';

export const paymentColumns: ColumnDef<PaymentEntry>[] = [
  {
    accessorFn: (r) => r.house.house_number,
    id: 'house',
    header: 'No. Rumah',
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (r) => r.resident.full_name,
    id: 'resident',
    header: 'Penghuni',
    cell: (info) => info.getValue(),
  },
  { accessorKey: 'fee_type', header: 'Jenis Biaya' },
  {
    id: 'periode',
    header: 'Periode',
    accessorFn: (r) => `${r.month}/${r.year}`,
  },
  {
    accessorKey: 'amount',
    header: 'Jumlah',
    cell: (info) => info.getValue<number>().toLocaleString(),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (info) => (info.getValue<string>() || '').toUpperCase(),
  },
  { accessorKey: 'payment_date', header: 'Tgl. Bayar' },
  {
    id: 'actions',
    header: 'Aksi',
    accessorFn: (r) => r.id,
    cell: () => null, // override later
  },
];
