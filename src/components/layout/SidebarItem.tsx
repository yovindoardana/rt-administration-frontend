import type { NavItem } from '@/types';
import { cn } from '@/utils';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const SidebarItem = React.memo(function SidebarItem({ name, href, icon: Icon }: NavItem) {
  return (
    <NavLink to={href} end className={({ isActive }) => cn('group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold', isActive ? 'bg-gray-50 text-indigo-600 [&>svg]:text-indigo-600' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50 [&>svg]:text-gray-400 [&>svg]:group-hover:text-indigo-600')}>
      <Icon className='mr-3 h-6 w-6 flex-shrink-0' aria-hidden='true' />
      {name}
    </NavLink>
  );
});
