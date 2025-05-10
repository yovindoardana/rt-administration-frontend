// src/features/resident/components/ResidentForm.tsx
import { useState, type FormEvent } from 'react';
import { createResident, updateResident } from '../services/resident';
import type { CreateResidentPayload, UpdateResidentPayload, Resident } from '@/types/resident';

interface Props {
  initial?: Resident;
  onSaved: () => void;
}

export function ResidentForm({ initial, onSaved }: Props) {
  const isEdit = Boolean(initial);
  const [form, setForm] = useState<CreateResidentPayload & Partial<UpdateResidentPayload>>({
    full_name: initial?.full_name ?? '',
    id_card: initial?.id_card ?? null,
    residency_status: initial?.residency_status ?? '',
    phone_number: initial?.phone_number ?? '',
    marital_status: initial?.marital_status ?? '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const action = isEdit ? updateResident(initial!.id, form) : createResident(form);
    action.then(() => onSaved());
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-2'>
      <input type='text' placeholder='Nama Lengkap' value={form.full_name} onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))} required className='border px-2 py-1 rounded w-full' />
      <input type='text' placeholder='No. KTP' value={form.id_card || ''} onChange={(e) => setForm((f) => ({ ...f, id_card: e.target.value || null }))} className='border px-2 py-1 rounded w-full' />
      <select value={form.residency_status} onChange={(e) => setForm((f) => ({ ...f, residency_status: e.target.value }))} required className='border px-2 py-1 rounded w-full'>
        <option value=''>Pilih Status</option>
        <option value='permanent'>Permanent</option>
        <option value='contract'>Contract</option>
      </select>
      <input type='tel' placeholder='No. Telepon' value={form.phone_number} onChange={(e) => setForm((f) => ({ ...f, phone_number: e.target.value }))} required className='border px-2 py-1 rounded w-full' />
      <select value={form.marital_status} onChange={(e) => setForm((f) => ({ ...f, marital_status: e.target.value }))} required className='border px-2 py-1 rounded w-full'>
        <option value=''>Pilih Status Nikah</option>
        <option value='married'>Married</option>
        <option value='single'>Single</option>
      </select>
      <button type='submit' className='px-4 py-2 bg-blue-600 text-white rounded'>
        {isEdit ? 'Update' : 'Tambah'} Penghuni
      </button>
    </form>
  );
}
