import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import type { DashboardData } from '@/types/dashboard';

interface Props {
  data: DashboardData['annual'];
}

const IuranPengeluaranChart: React.FC<Props> = ({ data }) => (
  <ResponsiveContainer width='100%' height={300}>
    <BarChart data={data}>
      <XAxis dataKey='month' />
      <YAxis />
      <Tooltip formatter={(val: number) => val.toLocaleString('id-ID')} />
      <Bar dataKey='income' name='Iuran' />
      <Bar dataKey='expense' name='Pengeluaran' />
    </BarChart>
  </ResponsiveContainer>
);

export default React.memo(IuranPengeluaranChart);
