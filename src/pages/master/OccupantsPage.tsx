import { OccupantTable } from '@/features/occupant/components/OccupantTable';
import { OccupantForm } from '@/features/occupant/components/OccupantForm';

export default function OccupantsPage() {
  return (
    <div className='p-6'>
      <h1 className='text-2xl font-semibold mb-4'>Master Occupant History</h1>
      <div className='mb-6'>
        <OccupantForm />
      </div>
      <OccupantTable />
    </div>
  );
}
