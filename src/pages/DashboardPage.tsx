import React, { useEffect, useState } from 'react';
import Header from '@/components/dashboard/Header';
import StatCard from '@/components/dashboard/StatCard';
import ChartCard from '@/components/dashboard/ChartCard';
import IuranPengeluaranChart from '@/components/dashboard/IuranPengeluaranChart';
import SaldoLineChart from '@/components/dashboard/SaldoLineChart';
import TableCard from '@/components/dashboard/TableCard';
import QuickActions from '@/components/dashboard/QuickActions';
import Notifications from '@/components/dashboard/Notifications';
import type { DashboardData } from '@/types/dashboard';
import { getDashboardData } from '@/services/dashboard';

const DashboardPage: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    getDashboardData()
      .then(setData)
      .catch((err) => console.error('Fetch dashboard failed:', err));
  }, []);

  if (!data) return <div className='p-6'>Loading...</div>;

  const { user, stats, annual, balances, recent, overdues, agendas } = data;

  console.log(data)

  return (
    <div className='space-y-6 p-6'>
      {/* 1. Header */}
      <Header name={user.name} />

      {/* 2. KPI Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
        <StatCard title='Total Rumah' value={stats.totalHouses} icon='home' />
        <StatCard title='Total Penghuni' value={stats.totalResidents} icon='users' />
        <StatCard title='Iuran Bulan Ini' value={stats.monthIncome} icon='currency' />
        <StatCard title='Pengeluaran Bulan Ini' value={stats.monthExpense} icon='cash' />
        <StatCard title='Jatuh Tempo Minggu Ini' value={stats.dueThisWeek} icon='calendar' />
      </div>

      {/* 3. Charts */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <ChartCard title='Iuran vs Pengeluaran'>
          <IuranPengeluaranChart data={annual} />
        </ChartCard>
        <ChartCard title='Saldo Kas (Akumulasi)'>
          <SaldoLineChart data={balances} />
        </ChartCard>
      </div>

      {/* 4. Recent Activity */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <TableCard
          title='Pembayaran Terbaru'
          columns={[
            { key: 'payment_date', label: 'Tanggal' },
            { key: 'house_id', label: 'Rumah' },
            { key: 'resident_name', label: 'Nama Warga' },
            { key: 'amount', label: 'Jumlah' },
          ]}
          data={recent.payments}
        />
        <TableCard
          title='Pengeluaran Terakhir'
          columns={[
            { key: 'expense_date', label: 'Tanggal' },
            { key: 'category', label: 'Kategori' },
            { key: 'description', label: 'Deskripsi' },
            { key: 'amount', label: 'Jumlah' },
          ]}
          data={recent.expenses}
        />
      </div>

      {/* 5. Quick Actions & Notifications */}
      <div className='flex flex-col lg:flex-row gap-6'>
        <QuickActions
          actions={[
            {
              label: 'Tambah Rumah',
              icon: 'plus',
              onClick: () => {
                /* ... */
              },
            },
            {
              label: 'Daftar Penghuni',
              icon: 'users',
              onClick: () => {
                /* ... */
              },
            },
            {
              label: 'Rekam Pembayaran',
              icon: 'currency',
              onClick: () => {
                /* ... */
              },
            },
            {
              label: 'Rekam Pengeluaran',
              icon: 'cash',
              onClick: () => {
                /* ... */
              },
            },
            {
              label: 'Laporan Bulanan',
              icon: 'document',
              onClick: () => {
                /* ... */
              },
            },
            {
              label: 'Laporan Tahunan',
              icon: 'document',
              onClick: () => {
                /* ... */
              },
            },
          ]}
        />
        <Notifications overdues={overdues} agendas={agendas} />
      </div>
    </div>
  );
};

export default DashboardPage;
