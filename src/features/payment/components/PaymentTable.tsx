import { useMemo } from 'react';
import { useReactTable, getCoreRowModel, type CellContext, type ColumnDef } from '@tanstack/react-table';
import { Table } from '@/components/ui/Table';
import type { PaymentEntry } from '@/types/payment';
import { paymentColumns } from './paymentColumns';
import { updatePayment } from '../services/payment';
import { usePayments } from '../hooks/usePayments';
import { Pagination } from '@/components/ui/Pagination';

export function PaymentTable() {
  const { items, meta, setPage, loading, error } = usePayments();

  const columns = useMemo<ColumnDef<PaymentEntry, any>[]>(
    () =>
      paymentColumns.map((col) =>
        col.id === 'actions'
          ? {
              ...col,
              cell: (ctx: CellContext<PaymentEntry, number>) => {
                const id = ctx.getValue();
                const nextStatus = ctx.row.original.status === 'paid' ? 'unpaid' : 'paid';
                return (
                  <button onClick={() => updatePayment(id, { status: nextStatus })} className='px-2 py-1 bg-blue-600 text-white rounded'>
                    {nextStatus === 'paid' ? 'Tandai Lunas' : 'Batal Lunas'}
                  </button>
                );
              },
            }
          : col
      ),
    []
  );

  const table = useReactTable<PaymentEntry>({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <div>Loading…</div>;
  if (error) return <div className='text-red-600'>{error}</div>;
  if (!items.length) return <div>Tidak ada pembayaran.</div>;

  return (
    <>
      <Table table={table} />
      <Pagination meta={meta} onPageChange={setPage} />
    </>
  );
}
