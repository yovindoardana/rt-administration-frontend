import { useState, useCallback } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { HouseTable } from '@/features/house/components/HouseTable';
import { HouseFormModal } from '@/features/house/components/HouseFormModal';
import type { House, CreateHousePayload } from '@/types/house';
import { useCreateHouse } from '@/features/house/hooks/useCreateHouse';
import { useUpdateHouse } from '@/features/house/hooks/useUpdateHouse';

export default function HousesPage() {
  const [isFormOpen, setFormOpen] = useState(false);
  const [editingHouse, setEditingHouse] = useState<House | null>(null);

  const createMut = useCreateHouse();
  const updateMut = useUpdateHouse();

  const openCreate = () => {
    setEditingHouse(null);
    setFormOpen(true);
  };
  const handleCreate = (vals: CreateHousePayload) => createMut.mutate(vals, { onSuccess: () => setFormOpen(false) });

  const openEdit = useCallback((h: House) => {
    setEditingHouse(h);
    setFormOpen(true);
  }, []);
  const handleUpdate = (vals: CreateHousePayload) => editingHouse && updateMut.mutate({ id: editingHouse.id, data: vals }, { onSuccess: () => setFormOpen(false) });

  const isLoading = createMut.isPending || updateMut.isPending;
  const error = createMut.error ?? updateMut.error ?? undefined;

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      {/* Header */}
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-2xl font-semibold'>Daftar Rumah</h1>
        <button onClick={openCreate} className='inline-flex items-center rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
          <PlusIcon className='h-4 w-4 mr-1' />
          Tambah Rumah
        </button>
      </div>

      {/* Table dengan tombol Edit */}
      <HouseTable onEdit={openEdit} />

      {/* Modal form untuk Create & Edit */}
      <HouseFormModal isOpen={isFormOpen} initialValues={editingHouse ? { house_number: editingHouse.house_number, status: editingHouse.status } : undefined} onClose={() => setFormOpen(false)} onSubmit={editingHouse ? handleUpdate : handleCreate} isLoading={isLoading} error={error} />
    </div>
  );
}
