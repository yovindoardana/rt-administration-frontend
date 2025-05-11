import { useState } from 'react';
import { ResidentTable } from '@/features/resident/components/ResidentTable';
import { ResidentForm } from '@/features/resident/components/ResidentForm';
import { useResidentDetail } from '@/features/resident/hooks/useResidentDetail';
import { Modal } from '@/components/ui/Modal';
import { useResidents } from '@/features/resident/hooks/useResident';

export default function ResidentPage() {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const { resident: editingResident, loading: detailLoading } = useResidentDetail(editingId);
  const { refresh } = useResidents();

  const onSaved = () => {
    setEditingId(null);
    setShowCreate(false);
    setShowEdit(false);
    refresh();
  };

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='flex items-center justify-between py-4'>
        <h1 className='text-2xl font-semibold'>Master Penghuni</h1>
        <button onClick={() => setShowCreate(true)} className='rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50'>
          Tambah Penghuni
        </button>
      </div>

      <ResidentTable
        onEdit={(r) => {
          setEditingId(r.id);
          setShowEdit(true);
        }}
      />

      {/* Modal tambah */}
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title='Tambah Penghuni'>
        <ResidentForm onSaved={onSaved} />
      </Modal>

      {/* Modal edit */}
      <Modal isOpen={showEdit} onClose={() => setShowEdit(false)} title='Edit Penghuni'>
        {detailLoading && <div>Loading detail…</div>}
        {!detailLoading && editingResident && <ResidentForm initial={editingResident} onSaved={onSaved} />}
      </Modal>
    </div>
  );
}
