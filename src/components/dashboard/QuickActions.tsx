import React from 'react';
import { PlusIcon, UsersIcon, CurrencyDollarIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const ICONS = {
  plus: PlusIcon,
  users: UsersIcon,
  currency: CurrencyDollarIcon,
  cash: CurrencyDollarIcon,
  document: DocumentTextIcon,
};

interface Action {
  label: string;
  icon: keyof typeof ICONS;
  onClick: () => void;
}

interface Props {
  actions: Action[];
}

const QuickActions: React.FC<Props> = ({ actions }) => (
  <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
    {actions.map((a) => {
      const Icon = ICONS[a.icon];
      return (
        <button key={a.label} onClick={a.onClick} className='bg-blue-50 hover:bg-blue-100 p-4 rounded-lg flex flex-col items-center'>
          <Icon className='h-6 w-6 mb-2 text-blue-600' aria-hidden='true' />
          <span className='text-sm font-medium'>{a.label}</span>
        </button>
      );
    })}
  </div>
);

export default React.memo(QuickActions);
