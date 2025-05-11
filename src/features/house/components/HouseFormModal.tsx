// src/features/house/components/HouseFormModal.tsx
import { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import type { CreateHousePayload } from '@/types/house';

interface Props {
  isOpen: boolean;
  initialValues?: CreateHousePayload;
  onClose: () => void;
  onSubmit: (vals: CreateHousePayload) => void;
  isLoading: boolean;
  error?: string;
}

export function HouseFormModal({ isOpen, initialValues, onClose, onSubmit, isLoading, error }: Props) {
  const [houseNumber, setHouseNumber] = useState('');
  const [status, setStatus] = useState<'vacant' | 'occupied'>('vacant');

  useEffect(() => {
    if (!isOpen) return;
    if (initialValues) {
      setHouseNumber(initialValues.house_number);
      setStatus(initialValues.status);
    } else {
      setHouseNumber('');
      setStatus('vacant');
    }
  }, [isOpen, initialValues]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='bg-white w-full max-w-md rounded-lg shadow-xl p-6 relative'>
        <button onClick={onClose} className='absolute top-4 right-4 text-gray-400 hover:text-gray-600'>
          <XMarkIcon className='h-5 w-5' />
        </button>

        <h2 className='text-lg font-medium text-gray-900 mb-4'>{initialValues ? 'Edit Rumah' : 'Tambah Rumah'}</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({ house_number: houseNumber, status });
          }}
          className='space-y-4'>
          <div>
            <label htmlFor='houseNumber' className='block text-sm font-medium text-gray-900'>
              No. Rumah
            </label>
            <input id='houseNumber' type='text' value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} required className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-indigo-600 sm:text-sm sm:leading-6' />
          </div>

          {error && <p className='text-red-500 text-sm'>{error}</p>}

          <div className='flex justify-end space-x-2'>
            <button type='button' onClick={onClose} className='rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
              Batal
            </button>
            <button type='submit' disabled={isLoading} className='rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50'>
              {isLoading ? (initialValues ? 'Mengubah…' : 'Menyimpan…') : initialValues ? 'Ubah' : 'Tambah'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
