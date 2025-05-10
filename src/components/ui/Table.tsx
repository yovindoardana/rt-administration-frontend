import type { Table as ReactTableType } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';

interface Props<T> {
  table: ReactTableType<T>;
}

export function Table<T>({ table }: Props<T>) {
  return (
    <table className='min-w-full divide-y divide-gray-200'>
      <thead className='bg-gray-50'>
        {table.getHeaderGroups().map((hg) => (
          <tr key={hg.id}>
            {hg.headers.map((header) => (
              <th key={header.id} className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className='bg-white divide-y divide-gray-200'>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className='px-4 py-2 whitespace-nowrap text-sm'>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
