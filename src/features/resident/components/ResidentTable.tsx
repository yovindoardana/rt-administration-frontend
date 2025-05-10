import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import type { Resident } from '../resident';
import { useResidents } from '../hooks/useResident';

const residentColumns: ColumnDef<Resident>[] = [
  { accessorKey: 'full_name', header: 'Nama Lengkap' },
  { accessorKey: 'id_card', header: 'No. KTP', cell: (info) => info.getValue() ?? '-' },
  { accessorKey: 'residency_status', header: 'Status Tinggal' },
  { accessorKey: 'phone_number', header: 'Telepon' },
  { accessorKey: 'marital_status', header: 'Status Perkawinan' },
  {
    accessorKey: 'created_at',
    header: 'Dibuat Pada',
    cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
  },
  {
    id: 'actions',
    header: 'Aksi',
    accessorFn: (row) => row.id,
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

export function ResidentTable() {
  const { page, setPage, residents, links, meta, loading, error } = useResidents();

  const table = useReactTable({
    data: residents,
    columns: residentColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <div>Loading…</div>;
  if (error) return <div className='text-red-600'>Error: {error}</div>;
  if (residents.length === 0) return <div>Tidak ada penghuni.</div>;

  return (
    <>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th key={header.id} className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className='px-4 py-2 whitespace-nowrap text-sm text-gray-700'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* 5. Kontrol pagination */}
      <div className='flex items-center justify-between mt-4'>
        <button onClick={() => setPage(page - 1)} disabled={!links.prev} className='px-3 py-1 border rounded disabled:opacity-50'>
          Prev
        </button>

        <span>
          Halaman {meta.current_page} / {meta.last_page} — Total {meta.total}
        </span>

        <button onClick={() => setPage(page + 1)} disabled={!links.next} className='px-3 py-1 border rounded disabled:opacity-50'>
          Next
        </button>
      </div>
    </>
  );
}
