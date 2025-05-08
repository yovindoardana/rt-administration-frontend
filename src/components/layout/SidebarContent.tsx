import type { SidebarContentProps } from '@/types';
import { SidebarItem } from './SidebarItem';
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline';

export function SidebarContent({ sections, logoSrc, onLogout }: SidebarContentProps) {
  return (
    <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-6'>
      <div className='flex h-16 shrink-0 items-center'>
        <img className='h-8 w-auto' src={logoSrc} alt='Logo Aplikasi' />
      </div>
      <nav className='flex flex-col gap-y-6' role='navigation' aria-label='Main sidebar'>
        {sections.map((section) => (
          <ul key={section.title ?? 'default'} className='flex flex-1 flex-col'>
            {section.title && <li className='px-2 text-xs font-semibold leading-6 text-gray-400'>{section.title}</li>}
            <ul className='-mx-2 mt-2 space-y-1'>
              {section.items.map((item) => (
                <SidebarItem key={item.name ?? 'default-item'} {...item} />
              ))}
            </ul>
          </ul>
        ))}
      </nav>
      {onLogout && (
        <div className='mt-auto'>
          <button onClick={onLogout} className='w-full text-left group flex items-center px-2 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50'>
            <ArrowLeftEndOnRectangleIcon className='h-6 w-6 shrink-0 text-red-600 group-hover:text-red-500 mr-3' aria-hidden='true' />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
