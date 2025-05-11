import { useState } from 'react';
import { useHouses } from '@/features/house/hooks/useHouses';
import { HouseTable } from '@/features/house/components/HouseTable';
import { HouseFormModal } from '@/features/house/components/HouseFormModal';
import type { House, CreateHousePayload } from '@/types/house';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

export default function HousesPage() {
  const [isFormOpen, setFormOpen] = useState(false);
  const [editingHouse, setEditingHouse] = useState<House | undefined>();

  const { data: houses = [], meta, setPage, loading, error, onCreate, onUpdate, onRemove } = useHouses();

  const openAdd = () => {
    setEditingHouse(undefined);
    setFormOpen(true);
  };

  const openEdit = (house: House) => {
    setEditingHouse(house);
    setFormOpen(true);
  };

  const handleClose = () => setFormOpen(false);

  const handleSubmit = async (vals: CreateHousePayload) => {
    if (editingHouse) {
      await onUpdate(editingHouse.id, vals);
    } else {
      await onCreate(vals);
    }
    setFormOpen(false);
  };

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      {/* Header + tombol Tambah */}
      <div className='flex items-center justify-between py-4'>
        <h1 className='text-2xl font-semibold'>Daftar Rumah</h1>
        <button onClick={openAdd} className='rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50'>
          Tambah Rumah
        </button>
      </div>

      {loading && (
        <div className='flex items-center justify-between py-4'>
          <ArrowPathIcon className='animate-spin h-12 w-12 text-indigo-600 mx-auto' />
        </div>
      )}
      {error && <div className='text-red-500 text-center py-4'>Error: {error}</div>}
      {!loading && !houses.length && <div className='text-center py-4'>Tidak ada data rumah</div>}
      {!loading && !error && houses.length > 0 && <HouseTable data={houses} meta={meta} onPageChange={setPage} onEdit={openEdit} onRemove={onRemove} />}

      {/* Form Modal */}
      <HouseFormModal isOpen={isFormOpen} initialValues={editingHouse ? { house_number: editingHouse.house_number, status: editingHouse.status } : undefined} onClose={handleClose} onSubmit={handleSubmit} isLoading={loading} error={error ?? undefined} />
    </div>
  );
}
