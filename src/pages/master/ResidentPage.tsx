import { ResidentTable } from '@/features/resident/components/ResidentTable';

export default function ResidentsPage() {
  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-semibold'>Daftar Penghuni</h1>
        <a href='/residents/new' className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'>
          + Tambah Penghuni
        </a>
      </div>
      <ResidentTable />
    </div>
  );
}
