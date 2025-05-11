// src/pages/master/HouseDetailPage.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useMemo, type FormEvent } from 'react';
import { useReactTable, type ColumnDef, getCoreRowModel } from '@tanstack/react-table';
import { useHouseDetail } from '@/features/house/hooks/useHouseDetail';
import { Table } from '@/components/ui/Table';
import { Pagination } from '@/components/ui/Pagination';
import type { PaymentEntry, ResidentHistoryEntry } from '@/types';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { CreditCardIcon, UsersIcon } from '@heroicons/react/20/solid';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { Modal } from '@/components/ui/Modal';
import { PlusIcon } from '@heroicons/react/24/outline';
import { formatCurrency, formatDate } from '@/utils';
import { useAvailableResidents } from '@/features/resident/hooks/useAvailableResident';

export default function HouseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: availResidents = [], isLoading: availLoading, refetch: refetchAvailable } = useAvailableResidents();

  const {
    house,
    loading,
    error,

    // occupant pagination & actions
    occupantHistory,
    occupantMeta,
    setOccupantPage,
    onAddOccupant,
    onEndOccupant,

    // payment pagination & actions
    paymentHistory,
    paymentMeta,
    setPaymentPage,
    onCreatePayment,
    onUpdatePayment,
  } = useHouseDetail(Number(id));

  const [occupantForm, setOccupantForm] = useState({
    resident_id: 0,
    start_date: new Date().toISOString().split('T')[0],
  });
  const [paymentForm, setPaymentForm] = useState({
    resident_id: 0,
    amount: 0,
    payment_date: new Date().toISOString().split('T')[0],
    status: 'unpaid' as 'paid' | 'unpaid',
  });
  const [isAddOccupantModalOpen, setAddOccupantModalOpen] = useState(false);
  const [isAddPaymentModalOpen, setAddPaymentModalOpen] = useState(false);

  const occupantColumns = useMemo<ColumnDef<ResidentHistoryEntry>[]>(
    () => [
      { accessorFn: (row) => row.resident.full_name, id: 'full_name', header: 'Nama', cell: (info) => info.getValue() },
      { accessorKey: 'start_date', header: 'Mulai', cell: (info) => formatDate(info.getValue<string>()) },
      { accessorKey: 'end_date', header: 'Selesai', cell: (info) => (info.getValue() ? formatDate(info.getValue<string>()) : '-') },
      { accessorKey: 'is_current', header: 'Status', cell: (info) => (info.getValue() ? 'Saat Ini' : 'Selesai') },
      {
        id: 'aksi',
        header: 'Aksi',
        cell: ({ row }) =>
          row.original.is_current && (
            <button onClick={() => onEndOccupant(row.original.id, new Date().toISOString().split('T')[0])} className='px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600'>
              Selesai
            </button>
          ),
      },
    ],
    [onEndOccupant]
  );

  const paymentColumns = useMemo<ColumnDef<PaymentEntry>[]>(
    () => [
      { accessorFn: (row) => row.resident.full_name, id: 'full_name', header: 'Nama', cell: (info) => info.getValue() },
      { accessorKey: 'amount', header: 'Jumlah', cell: (info) => formatCurrency(info.getValue<number>()) },
      { accessorKey: 'payment_date', header: 'Tanggal Pembayaran', cell: (info) => formatDate(info.getValue<string>()) },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => {
          const status = info.getValue<string>();
          return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{status === 'paid' ? 'Lunas' : 'Belum Lunas'}</span>;
        },
      },
      {
        id: 'aksi',
        header: 'Aksi',
        cell: ({ row }) => {
          const p = row.original;
          return (
            <button onClick={() => onUpdatePayment(p.id, p.status === 'paid' ? 'unpaid' : 'paid')} className={`rounded px-2 py-1 text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 ${p.status === 'unpaid' ? 'bg-green-600 hover:bg-green-500 focus-visible:outline-green-600' : 'bg-red-600 hover:bg-red-500 focus-visible:outline-red-600'}`}>
              {p.status === 'paid' ? 'Batal Lunas' : 'Tandai Lunas'}
            </button>
          );
        },
      },
    ],
    [onUpdatePayment]
  );

  const occupantTable = useReactTable({
    data: occupantHistory ?? [],
    columns: occupantColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const paymentTable = useReactTable({
    data: paymentHistory ?? [],
    columns: paymentColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleAddOccupant = (e: FormEvent) => {
    e.preventDefault();
    onAddOccupant(occupantForm.resident_id, occupantForm.start_date);
    setOccupantForm({
      resident_id: 0,
      start_date: new Date().toISOString().split('T')[0],
    });
    refetchAvailable();
  };

  const handleCreatePayment = (e: FormEvent) => {
    e.preventDefault();
    onCreatePayment(paymentForm.resident_id, paymentForm.amount, paymentForm.payment_date, paymentForm.status);
    setPaymentForm({
      resident_id: 0,
      amount: 0,
      payment_date: new Date().toISOString().split('T')[0],
      status: 'unpaid',
    });
  };

  if (loading) return <div>Loading…</div>;
  if (error) return <div className='text-red-600'>{error.message}</div>;

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      {/* Header */}
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-2xl font-semibold'>Detail Rumah {house?.house_number}</h1>
        <button onClick={() => navigate(-1)} className='inline-flex items-center rounded-md bg-gray-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'>
          <ArrowLeftIcon className='h-4 w-4 mr-1' />
          Kembali
        </button>
      </div>

      <TabGroup>
        <TabList className='-mb-px flex space-x-8' aria-label='Tabs'>
          <Tab className='group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium border-transparent text-gray-500 data-selected:border-indigo-500 data-selected:text-indigo-600 data-selected:[&>svg]:text-indigo-600 data-hover:text-gray-700 data-hover:[&>svg]:text-gray-700 focus-visible:outline-none'>
            <UsersIcon className='mr-2 h-5 w-5 -ml-0.5 ' />
            Penghuni
          </Tab>
          <Tab className='group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium border-transparent text-gray-500 data-selected:border-indigo-500 data-selected:text-indigo-600 data-selected:[&>svg]:text-indigo-600 data-hover:text-gray-700 data-hover:[&>svg]:text-gray-700 focus-visible:outline-none'>
            <CreditCardIcon className='mr-2 h-5 w-5 -ml-0.5 ' />
            Pembayaran
          </Tab>
        </TabList>

        <TabPanels className='py-6'>
          <TabPanel>
            {/* Penghuni */}
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-medium mb-2'>History Penghuni</h3>
              <button onClick={() => setAddOccupantModalOpen(true)} className='inline-flex items-center rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                <PlusIcon className='h-4 w-4 mr-1' />
                Tambah Penghuni
              </button>
            </div>
            <Modal isOpen={isAddOccupantModalOpen} onClose={() => setAddOccupantModalOpen(false)} title='Tambah Penghuni'>
              <form
                onSubmit={(e) => {
                  handleAddOccupant(e);
                  setAddOccupantModalOpen(false);
                }}
                className='space-y-2'>
                <div>
                  <label htmlFor='resident_id' className='block text-sm font-medium leading-6 text-gray-900'>
                    Penghuni
                  </label>
                  <div className='mt-2'>
                    <select
                      id='resident_id'
                      value={occupantForm.resident_id || ''}
                      onChange={(e) =>
                        setOccupantForm((prev) => ({
                          ...prev,
                          resident_id: Number(e.target.value),
                        }))
                      }
                      disabled={availLoading}
                      required
                      className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'>
                      <option value='' disabled>
                        -- Pilih Penghuni --
                      </option>
                      {availResidents.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.full_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor='start_date' className='block text-sm font-medium leading-6 text-gray-900'>
                    Tanggal Mulai
                  </label>
                  <div className='mt-2'>
                    <input type='date' id='start_date' value={occupantForm.start_date} onChange={(e) => setOccupantForm((prev) => ({ ...prev, start_date: e.target.value }))} className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6' required />
                  </div>
                </div>
                <div className='text-end'>
                  <button type='submit' className='rounded-md bg-green-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600'>
                    Simpan
                  </button>
                </div>
              </form>
            </Modal>

            <div className='overflow-x-auto shadow ring-1 ring-black/5 sm:rounded-lg'>
              <Table table={occupantTable} />
            </div>
            <div className='mt-4 sm:px-6 lg:px-8'>
              <Pagination meta={occupantMeta} onPageChange={setOccupantPage} />
            </div>
          </TabPanel>

          <TabPanel>
            {/* Pembayaran */}
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-medium mb-2'>History Pembayaran</h3>
              <button
                onClick={() => {
                  const currentOccupantId = occupantHistory.find((o) => o.is_current)?.resident.id ?? 0;
                  setPaymentForm((prev) => ({
                    ...prev,
                    resident_id: currentOccupantId,
                  }));
                  setAddPaymentModalOpen(true);
                }}
                className='inline-flex items-center rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                <PlusIcon className='h-4 w-4 mr-1' />
                <span className='hidden sm:block'>Tambah Pembayaran</span>
              </button>
            </div>
            <Modal isOpen={isAddPaymentModalOpen} onClose={() => setAddPaymentModalOpen(false)} title='Tambah Pembayaran'>
              <form
                onSubmit={(e) => {
                  handleCreatePayment(e);
                  setAddPaymentModalOpen(false);
                }}
                className='space-y-2'>
                <div>
                  <label htmlFor='amount' className='block text-sm font-medium leading-6 text-gray-900'>
                    Jumlah
                  </label>
                  <div className='mt-2'>
                    <input type='number' id='amount' value={paymentForm.amount || ''} onChange={(e) => setPaymentForm((prev) => ({ ...prev, amount: Number(e.target.value) }))} className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6' required />
                  </div>
                </div>
                <div>
                  <label htmlFor='payment_date' className='block text-sm font-medium leading-6 text-gray-900'>
                    Tanggal Pembayaran
                  </label>
                  <div className='mt-2'>
                    <input type='date' id='payment_date' value={paymentForm.payment_date} onChange={(e) => setPaymentForm((prev) => ({ ...prev, payment_date: e.target.value }))} className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6' required />
                  </div>
                </div>
                <div>
                  <label htmlFor='status' className='block text-sm font-medium leading-6 text-gray-900'>
                    Status
                  </label>
                  <select id='status' value={paymentForm.status} onChange={(e) => setPaymentForm((prev) => ({ ...prev, status: e.target.value as 'paid' | 'unpaid' }))} className='mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6' required>
                    <option value='unpaid'>Unpaid</option>
                    <option value='paid'>Paid</option>
                  </select>
                </div>
                <div className='text-end'>
                  <button type='submit' className='rounded-md bg-green-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600'>
                    Simpan
                  </button>
                </div>
              </form>
            </Modal>

            <div className='overflow-x-auto shadow ring-1 ring-black/5 sm:rounded-lg'>
              <Table table={paymentTable} />
            </div>
            <div className='mt-4 sm:px-6 lg:px-8'>
              <Pagination meta={paymentMeta} onPageChange={setPaymentPage} />
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
