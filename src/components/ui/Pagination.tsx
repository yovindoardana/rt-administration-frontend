import type { PaginationMeta } from '@/types/common';
import { getPageFromUrl } from '@/utils';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Props {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}

export function Pagination({ meta, onPageChange }: Props) {
  return (
    <div className='flex items-center justify-between border-t border-gray-200 py-3'>
      {/* MOBILE */}
      <div className='flex flex-1 justify-between sm:hidden'>
        {/* Prev */}
        <a
          href='#'
          onClick={(e) => {
            e.preventDefault();
            const prevPage = getPageFromUrl(meta.links[0].url);
            if (prevPage) onPageChange(prevPage);
          }}
          className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50'
          aria-disabled={!meta.links[0].url}>
          Previous
        </a>

        {/* Next */}
        <a
          href='#'
          onClick={(e) => {
            e.preventDefault();
            const nextPage = getPageFromUrl(meta.links[meta.links.length - 1].url);
            if (nextPage) onPageChange(nextPage);
          }}
          className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50'
          aria-disabled={!meta.links[meta.links.length - 1].url}>
          Next
        </a>
      </div>

      {/* DESKTOP */}
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm text-gray-700'>
            Showing <span className='font-medium'>{meta.from}</span> to <span className='font-medium'>{meta.to}</span> of <span className='font-medium'>{meta.total}</span> results
          </p>
        </div>
        <div>
          <nav aria-label='Pagination' className='isolate inline-flex -space-x-px rounded-md shadow-sm'>
            {meta.links.map((link, idx) => {
              // Previous
              if (link.label.includes('Previous')) {
                const prevPage = getPageFromUrl(link.url);
                return (
                  <a
                    key={idx}
                    href='#'
                    onClick={(e) => {
                      e.preventDefault();
                      if (prevPage) onPageChange(prevPage);
                    }}
                    className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 disabled:opacity-50 focus:outline-offset-0'
                    aria-disabled={!link.url}>
                    <span className='sr-only'>Previous</span>
                    <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
                  </a>
                );
              }

              // Next
              if (link.label.includes('Next')) {
                const nextPage = getPageFromUrl(link.url);
                return (
                  <a
                    key={idx}
                    href='#'
                    onClick={(e) => {
                      e.preventDefault();
                      if (nextPage) onPageChange(nextPage);
                    }}
                    className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 disabled:opacity-50 focus:outline-offset-0'
                    aria-disabled={!link.url}>
                    <span className='sr-only'>Next</span>
                    <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
                  </a>
                );
              }

              // Ellipsis (...)
              if (link.label === '...') {
                return (
                  <span key={idx} className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 ring-inset focus:outline-offset-0'>
                    …
                  </span>
                );
              }

              // Page Numbers
              const pageNum = Number(link.label);
              const baseClasses = link.active ? 'relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' : 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0';
              const responsiveClasses = pageNum > 2 && pageNum < meta.last_page - 1 ? 'hidden md:inline-flex' : 'inline-flex';

              return (
                <a
                  key={idx}
                  href={link.url ?? undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(pageNum);
                  }}
                  className={`${baseClasses} ${responsiveClasses}`}
                  aria-current={link.active ? 'page' : undefined}>
                  {pageNum}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
