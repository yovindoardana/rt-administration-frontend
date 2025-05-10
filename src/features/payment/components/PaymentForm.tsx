// src/features/payment/components/PaymentForm.tsx
import { useState, type FormEvent } from 'react';
import { createPayment } from '../services/payment';
import type { CreatePaymentPayload } from '@/types/payment';

export function PaymentForm({ onAdded }: { onAdded?: () => void }) {
  const [form, setForm] = useState<CreatePaymentPayload>({
    house_id: 0,
    resident_id: 0,
    fee_type: '',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    duration_months: 1,
    amount: 0,
    payment_date: new Date().toISOString().split('T')[0],
    status: 'unpaid',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    createPayment(form).then(() => {
      onAdded?.();
    });
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-2 mb-6'>
      <div className='flex space-x-2'>
        <input type='number' placeholder='House ID' value={form.house_id} onChange={(e) => setForm((f) => ({ ...f, house_id: +e.target.value }))} required className='border px-2 py-1 rounded w-1/4' />
        <input type='number' placeholder='Resident ID' value={form.resident_id} onChange={(e) => setForm((f) => ({ ...f, resident_id: +e.target.value }))} required className='border px-2 py-1 rounded w-1/4' />
        <input type='text' placeholder='Fee Type' value={form.fee_type} onChange={(e) => setForm((f) => ({ ...f, fee_type: e.target.value }))} required className='border px-2 py-1 rounded w-1/4' />
        <input type='number' placeholder='Bulan' value={form.month} onChange={(e) => setForm((f) => ({ ...f, month: +e.target.value }))} required className='border px-2 py-1 rounded w-1/12' />
        <input type='number' placeholder='Tahun' value={form.year} onChange={(e) => setForm((f) => ({ ...f, year: +e.target.value }))} required className='border px-2 py-1 rounded w-1/12' />
      </div>
      <div className='flex space-x-2'>
        <input
          type='number'
          placeholder='Durasi (bln)'
          value={form.duration_months}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              duration_months: +e.target.value,
            }))
          }
          required
          className='border px-2 py-1 rounded w-1/4'
        />
        <input type='number' placeholder='Jumlah' value={form.amount} onChange={(e) => setForm((f) => ({ ...f, amount: +e.target.value }))} required className='border px-2 py-1 rounded w-1/4' />
        <input type='date' value={form.payment_date} onChange={(e) => setForm((f) => ({ ...f, payment_date: e.target.value }))} required className='border px-2 py-1 rounded w-1/4' />
        <select
          value={form.status}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              status: e.target.value as 'paid' | 'unpaid',
            }))
          }
          className='border px-2 py-1 rounded w-1/4'>
          <option value='unpaid'>Unpaid</option>
          <option value='paid'>Paid</option>
        </select>
      </div>
      <button type='submit' className='px-4 py-2 bg-blue-600 text-white rounded'>
        Tambah Pembayaran
      </button>
    </form>
  );
}
