import React from 'react';
import { HomeIcon, UsersIcon, CurrencyDollarIcon, CalendarIcon, DocumentTextIcon, PlusIcon } from '@heroicons/react/24/outline';

const ICONS = {
  home: HomeIcon,
  users: UsersIcon,
  currency: CurrencyDollarIcon,
  cash: CurrencyDollarIcon,
  calendar: CalendarIcon,
  document: DocumentTextIcon,
  plus: PlusIcon,
};

interface Props {
  title: string;
  value: number;
  icon: keyof typeof ICONS;
}

const StatCard: React.FC<Props> = ({ title, value, icon }) => {
  const Icon = ICONS[icon];
  return (
    <div className='bg-white shadow rounded-lg p-4 flex items-center'>
      <Icon className='h-8 w-8 text-blue-500' aria-hidden='true' />
      <div className='ml-4'>
        <p className='text-sm text-gray-500'>{title}</p>
        <p className='text-xl font-semibold'>{value.toLocaleString('id-ID')}</p>
      </div>
    </div>
  );
};

export default React.memo(StatCard);
