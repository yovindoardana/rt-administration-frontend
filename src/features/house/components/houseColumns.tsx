import type { ColumnDef } from '@tanstack/react-table';
import type { House } from '@/types/house';
import { EyeIcon, PencilIcon } from '@heroicons/react/24/solid';

export function getHouseColumns(onEdit: (h: House) => void): ColumnDef<House>[] {
  return [
    {
      accessorKey: 'house_number',
      header: 'No. Rumah',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (info) => {
        const val = info.getValue<'vacant' | 'occupied'>();
        const style = val === 'vacant' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
        return <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${style}`}>{val === 'vacant' ? 'Kosong' : 'Terisi'}</span>;
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const h = row.original;
        return (
          <div className='flex space-x-2 justify-end'>
            <a href={`/houses/${h.id}`} className='px-2 py-1 bg-blue-50 text-blue-600 rounded'>
              <EyeIcon className='h-4 w-4' />
            </a>
            <button onClick={() => onEdit(h)} className='px-2 py-1 bg-green-50 text-green-600 rounded'>
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
