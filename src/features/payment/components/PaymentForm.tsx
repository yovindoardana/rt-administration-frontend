// src/features/payment/components/PaymentForm.tsx
import { useState, type FormEvent } from 'react';
// import { paymentService } from '../services/paymentService';
// import { useResidents } from '@/features/resident/hooks/useResidents';
import type { Resident } from '@/types/resident';
import { useResidents } from '@/features/resident/hooks/useResident';
import { paymentService } from '../services/payment';

interface PaymentFormProps {
  houseId: number;
  onSuccess: () => void;
}

export function PaymentForm({ houseId, onSuccess }: PaymentFormProps) {
  // ambil daftar resident untuk dropdown
  const { data: residents = [], isLoading: resLoading } = useResidents();

  const [form, setForm] = useState({
    resident_id: 0,
    amount: 0,
    payment_date: new Date().toISOString().split('T')[0],
    status: 'unpaid' as 'paid' | 'unpaid',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // panggil service.create, bukan createPayment
      await paymentService.create(houseId, form);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Gagal menyimpan pembayaran');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      {/* Pilih Resident */}
      <div>
        <label htmlFor='resident_id' className='block text-sm font-medium text-gray-900'>
          Penghuni
        </label>
        <select id='resident_id' value={form.resident_id} onChange={(e) => setForm((s) => ({ ...s, resident_id: Number(e.target.value) }))} disabled={resLoading || submitting} required className='mt-1 block w-full rounded-md border-gray-300 py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
          <option value={0} disabled>
            -- Pilih Penghuni --
          </option>
          {residents.map((r: Resident) => (
            <option key={r.id} value={r.id}>
              {r.full_name}
            </option>
          ))}
        </select>
      </div>

      {/* Jumlah */}
      <div>
        <label htmlFor='amount' className='block text-sm font-medium text-gray-900'>
          Jumlah
        </label>
        <input type='number' id='amount' value={form.amount} onChange={(e) => setForm((s) => ({ ...s, amount: Number(e.target.value) }))} disabled={submitting} required className='mt-1 block w-full rounded-md border-gray-300 py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
      </div>

      {/* Tanggal Pembayaran */}
      <div>
        <label htmlFor='payment_date' className='block text-sm font-medium text-gray-900'>
          Tanggal Pembayaran
        </label>
        <input type='date' id='payment_date' value={form.payment_date} onChange={(e) => setForm((s) => ({ ...s, payment_date: e.target.value }))} disabled={submitting} required className='mt-1 block w-full rounded-md border-gray-300 py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
      </div>

      {/* Status */}
      <div>
        <label htmlFor='status' className='block text-sm font-medium text-gray-900'>
          Status
        </label>
        <select id='status' value={form.status} onChange={(e) => setForm((s) => ({ ...s, status: e.target.value as 'paid' | 'unpaid' }))} disabled={submitting} required className='mt-1 block w-full rounded-md border-gray-300 py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
          <option value='unpaid'>Belum Lunas</option>
          <option value='paid'>Lunas</option>
        </select>
      </div>

      {error && <p className='text-red-500 text-sm'>{error}</p>}

      <div className='text-right'>
        <button type='submit' disabled={submitting} className='inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50'>
          {submitting ? 'Menyimpan…' : 'Simpan'}
        </button>
      </div>
    </form>
  );
}
