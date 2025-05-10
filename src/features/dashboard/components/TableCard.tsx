import React from 'react';

interface Column<T> {
  key: keyof T;
  label: string;
}

interface Props<T> {
  title: string;
  columns: Column<T>[];
  data: T[];
}

function TableCard<T>({ title, columns, data }: Props<T>) {
  return (
    <div className='bg-white shadow rounded-lg p-4 overflow-x-auto'>
      <h2 className='text-lg font-semibold mb-2'>{title}</h2>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td key={String(col.key)} className='px-6 py-4 text-sm text-gray-700'>
                  {String(row[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default React.memo(TableCard) as typeof TableCard;
