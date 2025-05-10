import { useState } from 'react';
import { OccupantForm } from '@/features/occupant/components/OccupantForm';
import { OccupantTable } from '@/features/occupant/components/OccupantTable';

export default function OccupantsPage() {
  const [refreshFlag, setRefreshFlag] = useState(0);

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-semibold mb-4'>Master Riwayat Penghuni</h1>
      <OccupantForm onAdded={() => setRefreshFlag((f) => f + 1)} />
      <OccupantTable key={refreshFlag} />
    </div>
  );
}
