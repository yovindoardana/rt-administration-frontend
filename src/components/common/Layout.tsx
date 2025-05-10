import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import type { Section } from '../../types';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  sections: Section[];
  logoSrc: string;
  children: React.ReactNode;
}

export default function Layout({ sections, logoSrc, children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='h-screen'>
      <Sidebar sections={sections} logoSrc={logoSrc} sidebarOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile top bar */}
      <div className='sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden'>
        <button type='button' className='-m-2.5 p-2.5 text-gray-700' onClick={() => setSidebarOpen(true)}>
          <span className='sr-only'>Open sidebar</span>
          <Bars3Icon className='h-6 w-6' aria-hidden='true' />
        </button>
      </div>

      {/* Main content */}
      <main className='py-6 lg:py-10 lg:pl-72'>
        <div className='px-4 sm:px-6 lg:px-8'>{children}</div>
      </main>
    </div>
  );
}
