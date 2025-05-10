import { useState } from 'react';
import { ResidentTable } from '@/features/resident/components/ResidentTable';
import { ResidentForm } from '@/features/resident/components/ResidentForm';
import { useResidentDetail } from '@/features/resident/hooks/useResidentDetail';

export default function ResidentPage() {
  const [editingId, setEditingId] = useState<number | null>(null);
  const { resident: editingResident, loading: detailLoading } = useResidentDetail(editingId);

  const onSaved = () => {
    setEditingId(null);
  };

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-semibold mb-4'>Master Penghuni</h1>

      {/* Form tambah */}
      <div className='mb-6'>
        <ResidentForm onSaved={onSaved} />
      </div>

      {/* Tabel */}
      <ResidentTable onView={(id) => setEditingId(id)} />

      {/* Form edit */}
      {editingId !== null && (
        <div className='mt-6 p-4 border rounded bg-gray-50'>
          <h2 className='font-semibold mb-2'>Edit Penghuni</h2>

          {detailLoading && <div>Loading detail…</div>}
          {!detailLoading && editingResident && <ResidentForm initial={editingResident} onSaved={onSaved} />}
        </div>
      )}
    </div>
  );
}
