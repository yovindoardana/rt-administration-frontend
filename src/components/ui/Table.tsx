import { cn } from '@/utils';
import type { Table as ReactTableType } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';

interface Props<T> {
  table: ReactTableType<T>;
}

export function Table<T>({ table }: Props<T>) {
  return (
    <table className='min-w-full divide-y divide-gray-300'>
      <thead className='bg-gray-50'>
        {table.getHeaderGroups().map((hg) => (
          <tr key={hg.id}>
            {hg.headers.map((header, index) => (
              <th key={header.id} className={cn('text-left text-sm font-semibold text-gray-900', index === 0 ? 'py-3.5 pl-4 pr-3 sm:pl-6' : 'px-3 py-3.5')}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className='divide-y divide-gray-200 bg-white'>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell, index) => (
              <td key={cell.id} className={cn('whitespace-nowrap text-sm font-medium text-gray-900', index === 0 ? 'py-4 pl-4 pr-3 sm:pl-6' : 'px-3 py-4')}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
