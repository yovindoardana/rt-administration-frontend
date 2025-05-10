import React, { useEffect, useState } from 'react';
import { getHouses, createHouse, updateHouse, deleteHouse } from '@/services/house';
import type { House } from '@/types/house';
import { HouseDetailModal } from '@/components/HouseDetailModal';

export default function HousesPage() {
  const [houses, setHouses] = useState<House[]>([]);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({
    house_number: '',
    status: 'vacant' as 'occupied' | 'vacant',
  });

  const [detailId, setDetailId] = useState<number | null>(null);

  const fetchData = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getHouses(page);
      setHouses(res.data);
      setMeta(res.meta);
    } catch (err: any) {
      setError(err.message || 'Gagal memuat data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(meta.current_page);
  }, []);

  const openCreate = () => {
    setIsEdit(false);
    setEditId(null);
    setForm({ house_number: '', status: 'vacant' });
    setFormOpen(true);
  };

  const openEdit = (h: House) => {
    setIsEdit(true);
    setEditId(h.id);
    setForm({ house_number: h.house_number, status: h.status });
    setFormOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isEdit && editId != null) {
        await updateHouse(editId, form);
      } else {
        await createHouse(form);
      }
      setFormOpen(false);
      fetchData(meta.current_page);
    } catch (err: any) {
      setError(err.message || 'Gagal menyimpan data.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus rumah ini?')) return;
    setLoading(true);
    setError(null);
    try {
      await deleteHouse(id);
      fetchData(meta.current_page);
    } catch (err: any) {
      setError(err.message || 'Gagal menghapus data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-6'>
      <header className='flex justify-between items-center mb-4'>
        <h1 className='text-xl font-semibold'>Master Data – Rumah</h1>
        <button onClick={openCreate} className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'>
          Tambah Rumah
        </button>
      </header>

      {error && <div className='mb-4 text-red-600'>{error}</div>}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className='w-full table-auto border-collapse'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='border px-4 py-2'>#</th>
              <th className='border px-4 py-2'>No. Rumah</th>
              <th className='border px-4 py-2'>Status</th>
              <th className='border px-4 py-2'>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {houses.map((h, i) => (
              <tr key={h.id} className='hover:bg-gray-50'>
                <td className='border px-4 py-2'>{i + 1}</td>
                <td className='border px-4 py-2'>{h.house_number}</td>
                <td className='border px-4 py-2 capitalize'>{h.status}</td>
                <td className='border px-4 py-2 space-x-2'>
                  <button onClick={() => openEdit(h)} className='px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600'>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(h.id)} className='px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600'>
                    Hapus
                  </button>
                  <button onClick={() => setDetailId(h.id)} className='px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600'>
                    Kelola
                  </button>
                </td>
              </tr>
            ))}
            {houses.length === 0 && (
              <tr>
                <td colSpan={4} className='border px-4 py-2 text-center text-gray-500'>
                  Tidak ada data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div className='flex justify-between items-center mt-4'>
        <button onClick={() => fetchData(meta.current_page - 1)} disabled={meta.current_page <= 1} className='px-3 py-1 border rounded disabled:opacity-50'>
          Sebelumnya
        </button>
        <span>
          Halaman {meta.current_page} dari {meta.last_page}
        </span>
        <button onClick={() => fetchData(meta.current_page + 1)} disabled={meta.current_page >= meta.last_page} className='px-3 py-1 border rounded disabled:opacity-50'>
          Berikutnya
        </button>
      </div>

      {/* Modal Form */}
      {formOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center'>
          <div className='bg-white p-6 rounded shadow-lg w-full max-w-md'>
            <h2 className='text-lg font-semibold mb-4'>{isEdit ? 'Edit Rumah' : 'Tambah Rumah'}</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='block mb-1'>No. Rumah</label>
                <input name='house_number' value={form.house_number} onChange={handleChange} required className='w-full border px-3 py-2 rounded' />
              </div>
              <div>
                <label className='block mb-1'>Status</label>
                <select name='status' value={form.status} onChange={handleChange} className='w-full border px-3 py-2 rounded'>
                  <option value='vacant'>Vacant</option>
                  <option value='occupied'>Occupied</option>
                </select>
              </div>
              <div className='flex justify-end space-x-2'>
                <button type='button' onClick={() => setFormOpen(false)} className='px-4 py-2 border rounded hover:bg-gray-100'>
                  Batal
                </button>
                <button type='submit' className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'>
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Detail */}
      {detailId != null && <HouseDetailModal houseId={detailId} onClose={() => setDetailId(null)} />}
    </div>
  );
}
