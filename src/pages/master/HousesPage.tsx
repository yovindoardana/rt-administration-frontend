import { HouseTable } from '@/features/house/components/HouseTable';

export default function HousesPage() {
  return (
    <div className='p-6'>
      <div className='flex justify-between mb-4'>
        <h1 className='text-2xl font-semibold'>Daftar Rumah</h1>
        <a href='/houses/new' className='px-4 py-2 bg-blue-600 text-white rounded'>
          + Tambah Rumah
        </a>
      </div>

      <HouseTable />
    </div>
  );
}
