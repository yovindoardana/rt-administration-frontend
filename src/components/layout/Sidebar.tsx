import { Fragment } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { SidebarContent } from './SidebarContent';
import type { SidebarProps } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

export function Sidebar({ sections, logoSrc, sidebarOpen, onClose }: SidebarProps) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile */}
      <Transition show={sidebarOpen} as={Fragment}>
        <Dialog as='div' className='relative z-50 lg:hidden' onClose={onClose}>
          {/* overlay */}
          <TransitionChild as={Fragment} enter='transition-opacity ease-linear duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='transition-opacity ease-linear duration-300' leaveFrom='opacity-100' leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-gray-900/80' />
          </TransitionChild>

          <div className='fixed inset-0 flex'>
            {/* sliding panel */}
            <TransitionChild as={Fragment} enter='transition ease-in-out duration-300 transform' enterFrom='-translate-x-full' enterTo='translate-x-0' leave='transition ease-in-out duration-300 transform' leaveFrom='translate-x-0' leaveTo='-translate-x-full'>
              <DialogPanel className='relative flex w-full max-w-xs flex-1 flex-col bg-white pb-6'>
                {/* close button */}
                <div className='absolute top-0 right-0 -mr-12 pt-2'>
                  <button type='button' className='ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white' onClick={onClose}>
                    <span className='sr-only'>Close sidebar</span>
                    {/* Heroicon X */}
                    <svg className='h-6 w-6 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                    </svg>
                  </button>
                </div>

                {/* content */}
                <SidebarContent sections={sections} logoSrc={logoSrc} onLogout={handleLogout} />
              </DialogPanel>
            </TransitionChild>

            {/* dummy element */}
            <div className='w-14 flex-shrink-0' aria-hidden='true' />
          </div>
        </Dialog>
      </Transition>

      {/* Desktop */}
      <div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
        <SidebarContent sections={sections} logoSrc={logoSrc} onLogout={handleLogout} />
      </div>
    </>
  );
}
