import { useState, type FormEvent } from 'react';
import type { CreateOccupantPayload } from '@/types/occupant';
import { addOccupant } from '@/features/house/services/house';

export function OccupantForm({ onAdded }: { onAdded?: () => void }) {
  const [form, setForm] = useState<CreateOccupantPayload>({
    house_id: 0,
    resident_id: 0,
    start_date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addOccupant(form.house_id, form).then(() => {
      setForm({ ...form, house_id: 0, resident_id: 0 });
      onAdded?.();
    });
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-2 mb-6'>
      <div className='flex space-x-2'>
        <input type='number' placeholder='House ID' value={form.house_id} onChange={(e) => setForm((f) => ({ ...f, house_id: +e.target.value }))} required className='border px-2 py-1 rounded w-1/3' />
        <input type='number' placeholder='Resident ID' value={form.resident_id} onChange={(e) => setForm((f) => ({ ...f, resident_id: +e.target.value }))} required className='border px-2 py-1 rounded w-1/3' />
        <input type='date' value={form.start_date} onChange={(e) => setForm((f) => ({ ...f, start_date: e.target.value }))} required className='border px-2 py-1 rounded w-1/3' />
      </div>
      <button type='submit' className='px-4 py-2 bg-green-600 text-white rounded'>
        Tambah Riwayat
      </button>
    </form>
  );
}
