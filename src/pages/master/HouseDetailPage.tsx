// src/pages/master/HouseDetailPage.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { useState, type FormEvent } from 'react';
import { useHouseDetail } from '@/features/house/hooks/useHouseDetail';
import type { PaymentEntry, ResidentHistoryEntry } from '@/types';
// import type { PaymentEntry, ResidentHistoryEntry } from '@/features/house/house';

export default function HouseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { house, payments, loading, error, onAddOccupant, onEndOccupant, onCreatePayment, onUpdatePayment } = useHouseDetail(Number(id));

  const [tab, setTab] = useState<'occupants' | 'payments'>('occupants');
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

  const handleAddOccupant = (e: FormEvent) => {
    e.preventDefault();
    onAddOccupant(occupantForm.resident_id, occupantForm.start_date);
    setOccupantForm({
      resident_id: 0,
      start_date: new Date().toISOString().split('T')[0],
    });
  };

  const handleCreatePayment = (e: FormEvent) => {
    e.preventDefault();
    onCreatePayment(paymentForm.resident_id, paymentForm.amount, paymentForm.payment_date, paymentForm.status);
    setPaymentForm({
      resident_id: 0,
      amount: 0,
      payment_date: new Date().toISOString().split('T')[0],
      status: 'unpaid',
    });
  };

  return (
    <div className='p-6'>
      {/* Header */}
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-semibold'>Detail Rumah {house?.house_number ?? ''}</h1>
        <button onClick={() => navigate(-1)} className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300'>
          ← Kembali
        </button>
      </div>

      {/* Status loading / error */}
      {loading && <div>Loading…</div>}
      {error && <div className='text-red-600'>{error}</div>}

      {/* Konten halaman */}
      {!loading && house && (
        <>
          {/* Tabs */}
          <nav className='flex space-x-4 mb-4'>
            <button onClick={() => setTab('occupants')} className={`px-4 py-2 border-b-2 ${tab === 'occupants' ? 'border-blue-600 font-semibold' : 'border-transparent'}`}>
              Penghuni
            </button>
            <button onClick={() => setTab('payments')} className={`px-4 py-2 border-b-2 ${tab === 'payments' ? 'border-blue-600 font-semibold' : 'border-transparent'}`}>
              Pembayaran
            </button>
          </nav>

          {/* Tab Penghuni */}
          {tab === 'occupants' && (
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
                  {house.occupant_history.map((e: ResidentHistoryEntry) => (
                    <tr key={e.id} className='hover:bg-gray-50'>
                      <td className='border px-2 py-1'>{e.resident.full_name}</td>
                      <td className='border px-2 py-1'>{e.start_date}</td>
                      <td className='border px-2 py-1'>{e.end_date ?? '-'}</td>
                      <td className='border px-2 py-1 capitalize'>{e.is_current ? 'Saat Ini' : 'Selesai'}</td>
                      <td className='border px-2 py-1'>
                        {e.is_current && (
                          <button onClick={() => onEndOccupant(e.id, new Date().toISOString().split('T')[0])} className='px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600'>
                            Selesai
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {house.occupant_history.length === 0 && (
                    <tr>
                      <td colSpan={5} className='border px-2 py-1 text-center text-gray-500'>
                        Belum ada penghuni.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <form onSubmit={handleAddOccupant} className='mb-6 space-y-2'>
                <h4 className='font-semibold'>Tambah Penghuni</h4>
                <div className='flex space-x-2'>
                  <input
                    type='number'
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
                  <input
                    type='date'
                    value={occupantForm.start_date}
                    onChange={(e) =>
                      setOccupantForm((prev) => ({
                        ...prev,
                        start_date: e.target.value,
                      }))
                    }
                    required
                    className='w-1/3 border px-2 py-1 rounded'
                  />
                  <button type='submit' className='px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700'>
                    Tambah
                  </button>
                </div>
              </form>
            </section>
          )}

          {/* Tab Pembayaran */}
          {tab === 'payments' && (
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
                  {payments.map((p: PaymentEntry) => (
                    <tr key={p.id} className='hover:bg-gray-50'>
                      <td className='border px-2 py-1'>{p.resident.full_name}</td>
                      <td className='border px-2 py-1'>{p.amount}</td>
                      <td className='border px-2 py-1'>{p.payment_date}</td>
                      <td className='border px-2 py-1 capitalize'>{p.status}</td>
                      <td className='border px-2 py-1 space-x-1'>
                        <button onClick={() => onUpdatePayment(p.id, p.status === 'paid' ? 'unpaid' : 'paid')} className='px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600'>
                          {p.status === 'paid' ? 'Batal Lunas' : 'Tandai Lunas'}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {payments.length === 0 && (
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
                  <input
                    type='number'
                    placeholder='Jumlah'
                    value={paymentForm.amount}
                    onChange={(e) =>
                      setPaymentForm((prev) => ({
                        ...prev,
                        amount: Number(e.target.value),
                      }))
                    }
                    required
                    className='w-1/4 border px-2 py-1 rounded'
                  />
                  <input
                    type='date'
                    value={paymentForm.payment_date}
                    onChange={(e) =>
                      setPaymentForm((prev) => ({
                        ...prev,
                        payment_date: e.target.value,
                      }))
                    }
                    required
                    className='w-1/4 border px-2 py-1 rounded'
                  />
                  <select
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
        </>
      )}
    </div>
  );
}
