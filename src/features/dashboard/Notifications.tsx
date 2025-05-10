import React from 'react';
import type { Overdue, Agenda } from '@/types/dashboard';

interface Props {
  overdues: Overdue[];
  agendas: Agenda[];
}

const Notifications: React.FC<Props> = ({ overdues, agendas }) => (
  <div className='space-y-4 flex-1'>
    <div className='bg-white shadow rounded-lg p-4'>
      <h2 className='text-lg font-semibold mb-2'>Iuran Terlambat</h2>
      <ul className='space-y-1 text-sm text-gray-700'>
        {overdues.map((o, i) => (
          <li key={i}>
            {o.resident_name} (Rumah {o.house_id}) – <span className='font-medium'>{new Date(o.due_date).toLocaleDateString('id-ID')}</span>
          </li>
        ))}
      </ul>
    </div>
    <div className='bg-white shadow rounded-lg p-4'>
      <h2 className='text-lg font-semibold mb-2'>Agenda RT</h2>
      <ul className='space-y-1 text-sm text-gray-700'>
        {agendas.map((a, i) => (
          <li key={i}>
            <span className='font-medium'>{new Date(a.event_date).toLocaleDateString('id-ID')}</span> – {a.title}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default React.memo(Notifications);
