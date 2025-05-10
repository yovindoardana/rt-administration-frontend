import { XMarkIcon } from '@heroicons/react/24/outline';
import { type ReactNode } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: Props) {
  if (!isOpen) return null;
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='bg-white rounded-lg max-w-xl w-full p-6'>
        {title && (
          <div className='flex justify-between mb-4'>
            <h2 className='text-xl font-semibold'>{title}</h2>
            <button onClick={onClose} className='text-gray-500'>
              <XMarkIcon className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
}
