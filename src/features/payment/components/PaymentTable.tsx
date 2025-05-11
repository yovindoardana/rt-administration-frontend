import { useMemo } from 'react';
import { useReactTable, getCoreRowModel, type ColumnDef } from '@tanstack/react-table';
import { Table } from '@/components/ui/Table';
import type { PaymentEntry } from '@/types/payment';
import { paymentColumns } from './paymentColumns';
import { usePayments } from '../hooks/usePayments';
import { Pagination } from '@/components/ui/Pagination';
import { paymentService } from '../services/payment';

interface Props {
  houseId: number;
}

export function PaymentTable({ houseId }: Props) {
  const { data = [], meta, setPage, loading, error, refetch } = usePayments({ house_id: houseId });

  const columns = useMemo<ColumnDef<PaymentEntry>[]>(
    () =>
      paymentColumns.map((col) =>
        col.id === 'aksi'
          ? {
              ...col,
              cell: ({ row }) => {
                const p = row.original;
                const nextStatus = p.status === 'paid' ? 'unpaid' : 'paid';
                return (
                  <button
                    onClick={async () => {
                      await paymentService.updateStatus(p.id, nextStatus);
                      refetch();
                    }}
                    className='px-2 py-1 bg-blue-600 text-white rounded'>
                    {nextStatus === 'paid' ? 'Tandai Lunas' : 'Batal Lunas'}
                  </button>
                );
              },
            }
          : col
      ),
    [refetch]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <div>Loading…</div>;
  if (error) return <div className='text-red-600'>{error}</div>;
  if (data.length === 0) return <div>Tidak ada pembayaran.</div>;

  return (
    <>
      <Table table={table} />
      <Pagination meta={meta} onPageChange={setPage} />
    </>
  );
}
