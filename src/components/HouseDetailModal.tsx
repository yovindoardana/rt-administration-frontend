// src/components/HouseDetailModal.tsx
import React, { useEffect, useState } from 'react';
import { getHouseDetail, addOccupant, endOccupant, createPayment, updatePayment } from '@/services/house';
import type { HouseDetail, ResidentHistoryEntry, PaymentEntry } from '@/types/house';

interface Props {
  houseId: number;
  onClose: () => void;
}

export function HouseDetailModal({ houseId, onClose }: Props) {
  const [data, setData] = useState<HouseDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<'occupants' | 'payments'>('occupants');

  // Forms
  const [occupantForm, setOccupantForm] = useState({
    resident_id: 0,
    start_date: new Date().toISOString().split('T')[0],
  });
  const [paymentForm, setPaymentForm] = useState({
    resident_id: 0,
    amount: 0,
    payment_date: new Date().toISOString().split('T')[0],
    status: 'unpaid' as 'paid' | 'unpaid',
  });

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const detail = await getHouseDetail(houseId);
      console.log('House detail:', detail);
      setData(detail);
    } catch (err: any) {
      setError(err.message || 'Gagal memuat detail.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [houseId]);

  const handleAddOccupant = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await addOccupant(houseId, occupantForm);
      setOccupantForm({
        resident_id: 0,
        start_date: new Date().toISOString().split('T')[0],
      });
      await load();
    } catch (err: any) {
      setError(err.message || 'Gagal menambah penghuni.');
    } finally {
      setLoading(false);
    }
  };

  const handleEndOccupant = async (entry: ResidentHistoryEntry) => {
    if (!entry.is_current) return;
    if (!confirm('Tandai penghuni selesai?')) return;
    setLoading(true);
    setError(null);
    try {
      await endOccupant(houseId, entry.id, {
        end_date: new Date().toISOString().split('T')[0],
      });
      await load();
    } catch (err: any) {
      setError(err.message || 'Gagal menyelesaikan penghuni.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createPayment(houseId, paymentForm);
      setPaymentForm({
        resident_id: 0,
        amount: 0,
        payment_date: new Date().toISOString().split('T')[0],
        status: 'unpaid',
      });
      await load();
    } catch (err: any) {
      setError(err.message || 'Gagal menambah pembayaran.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePayment = async (entry: PaymentEntry, status: 'paid' | 'unpaid') => {
    setLoading(true);
    setError(null);
    try {
      await updatePayment(houseId, entry.id, { status });
      await load();
    } catch (err: any) {
      setError(err.message || 'Gagal mengubah status pembayaran.');
    } finally {
      setLoading(false);
    }
  };

  if (!data) {
    return (
      <div className='fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center'>
        <div className='bg-white p-6 rounded shadow-lg'>Loading...</div>
      </div>
    );
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 overflow-auto'>
      <div className='bg-white p-6 rounded shadow-lg max-w-3xl mx-auto my-8'>
        <header className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold'>Detail Rumah {data.house_number}</h2>
          <button onClick={onClose} className='text-2xl leading-none'>
            &times;
          </button>
        </header>
        {error && <div className='mb-4 text-red-600'>{error}</div>}
        <nav className='flex space-x-4 mb-4'>
          <button onClick={() => setTab('occupants')} className={`px-4 py-2 border-b-2 ${tab === 'occupants' ? 'border-blue-600 font-semibold' : 'border-transparent'}`}>
            Penghuni
          </button>
          <button onClick={() => setTab('payments')} className={`px-4 py-2 border-b-2 ${tab === 'payments' ? 'border-blue-600 font-semibold' : 'border-transparent'}`}>
            Pembayaran
          </button>
        </nav>
        {loading && <div>Loading...</div>}
        {!loading && tab === 'occupants' && (
          <section>
            <h3 className='text-lg font-medium mb-2'>History Penghuni</h3>
            <table className='w-full table-auto border-collapse mb-4'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='border px-2 py-1'>Nama</th>
                  <th className='border px-2 py-1'>Mulai</th>
                  <th className='border px-2 py-1'>Selesai</th>
                  <th className='border px-2 py-1'>Status</th>
                  <th className='border px-2 py-1'>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.occupant_history.map((entry) => (
                  <tr key={entry.id} className='hover:bg-gray-50'>
                    <td className='border px-2 py-1'>{entry.resident.full_name}</td>
                    <td className='border px-2 py-1'>{entry.start_date}</td>
                    <td className='border px-2 py-1'>{entry.end_date ?? '-'}</td>
                    <td className='border px-2 py-1 capitalize'>{entry.is_current ? 'Saat Ini' : 'Selesai'}</td>
                    <td className='border px-2 py-1'>
                      {entry.is_current && (
                        <button onClick={() => handleEndOccupant(entry)} className='px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600'>
                          Selesai
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {data.occupant_history.length === 0 && (
                  <tr>
                    <td colSpan={5} className='border px-2 py-1 text-center text-gray-500'>
                      Belum ada penghuni.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <form onSubmit={handleAddOccupant} className='mb-4 space-y-2'>
              <h4 className='font-semibold'>Tambah Penghuni</h4>
              <div className='flex space-x-2'>
                <input
                  type='number'
                  name='resident_id'
                  placeholder='Resident ID'
                  value={occupantForm.resident_id || ''}
                  onChange={(e) =>
                    setOccupantForm((prev) => ({
                      ...prev,
                      resident_id: Number(e.target.value),
                    }))
                  }
                  required
                  className='w-1/3 border px-2 py-1 rounded'
                />
                <input type='date' name='start_date' value={occupantForm.start_date} onChange={(e) => setOccupantForm((prev) => ({ ...prev, start_date: e.target.value }))} required className='w-1/3 border px-2 py-1 rounded' />
                <button type='submit' className='px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700'>
                  Tambah
                </button>
              </div>
            </form>
          </section>
        )}
        {!loading && tab === 'payments' && (
          <section>
            <h3 className='text-lg font-medium mb-2'>History Pembayaran</h3>
            <table className='w-full table-auto border-collapse mb-4'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='border px-2 py-1'>Nama</th>
                  <th className='border px-2 py-1'>Jumlah</th>
                  <th className='border px-2 py-1'>Tanggal</th>
                  <th className='border px-2 py-1'>Status</th>
                  <th className='border px-2 py-1'>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.payment_history.map((entry) => (
                  <tr key={entry.id} className='hover:bg-gray-50'>
                    <td className='border px-2 py-1'>{entry.resident.full_name}</td>
                    <td className='border px-2 py-1'>{entry.amount}</td>
                    <td className='border px-2 py-1'>{entry.payment_date}</td>
                    <td className='border px-2 py-1 capitalize'>{entry.status}</td>
                    <td className='border px-2 py-1 space-x-1'>
                      <button onClick={() => handleUpdatePayment(entry, entry.status === 'paid' ? 'unpaid' : 'paid')} className='px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600'>
                        {entry.status === 'paid' ? 'Batal Lunas' : 'Tandai Lunas'}
                      </button>
                    </td>
                  </tr>
                ))}
                {data.payment_history.length === 0 && (
                  <tr>
                    <td colSpan={5} className='border px-2 py-1 text-center text-gray-500'>
                      Belum ada pembayaran.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <form onSubmit={handleCreatePayment} className='space-y-2'>
              <h4 className='font-semibold'>Tambah Pembayaran</h4>
              <div className='flex space-x-2'>
                <input
                  type='number'
                  name='resident_id'
                  placeholder='Resident ID'
                  value={paymentForm.resident_id || ''}
                  onChange={(e) =>
                    setPaymentForm((prev) => ({
                      ...prev,
                      resident_id: Number(e.target.value),
                    }))
                  }
                  required
                  className='w-1/4 border px-2 py-1 rounded'
                />
                <input type='number' name='amount' placeholder='Jumlah' value={paymentForm.amount} onChange={(e) => setPaymentForm((prev) => ({ ...prev, amount: Number(e.target.value) }))} required className='w-1/4 border px-2 py-1 rounded' />
                <input type='date' name='payment_date' value={paymentForm.payment_date} onChange={(e) => setPaymentForm((prev) => ({ ...prev, payment_date: e.target.value }))} required className='w-1/4 border px-2 py-1 rounded' />
                <select
                  name='status'
                  value={paymentForm.status}
                  onChange={(e) =>
                    setPaymentForm((prev) => ({
                      ...prev,
                      status: e.target.value as 'paid' | 'unpaid',
                    }))
                  }
                  className='w-1/6 border px-2 py-1 rounded'>
                  <option value='unpaid'>Unpaid</option>
                  <option value='paid'>Paid</option>
                </select>
                <button type='submit' className='px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700'>
                  Tambah
                </button>
              </div>
            </form>
          </section>
        )}
      </div>
    </div>
  );
}
