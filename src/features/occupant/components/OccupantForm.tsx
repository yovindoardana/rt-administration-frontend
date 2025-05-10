import { useState, type FormEvent } from 'react';
import { addOccupant } from '../services/occupant';

export function OccupantForm() {
  const [residentId, setResidentId] = useState<number>(0);
  const [houseId, setHouseId] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addOccupant({ resident_id: residentId, house_id: houseId, start_date: startDate }).then(() => {});
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-2'>
      <div className='flex space-x-2'>
        <input type='number' placeholder='House ID' value={houseId} onChange={(e) => setHouseId(Number(e.target.value))} required className='border px-2 py-1 rounded w-1/3' />
        <input type='number' placeholder='Resident ID' value={residentId} onChange={(e) => setResidentId(Number(e.target.value))} required className='border px-2 py-1 rounded w-1/3' />
        <input type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} required className='border px-2 py-1 rounded w-1/3' />
      </div>
      <button type='submit' className='px-4 py-2 bg-green-600 text-white rounded'>
        Tambah Occupant
      </button>
    </form>
  );
}
