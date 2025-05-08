import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import type { DashboardData } from '@/types/dashboard';

interface Props {
  data: DashboardData['balances'];
}

const SaldoLineChart: React.FC<Props> = ({ data }) => (
  <ResponsiveContainer width='100%' height={300}>
    <LineChart data={data}>
      <XAxis dataKey='month' />
      <YAxis />
      <Tooltip formatter={(val: number) => val.toLocaleString('id-ID')} />
      <Line dataKey='balance' name='Saldo Kas' dot={false} />
    </LineChart>
  </ResponsiveContainer>
);

export default React.memo(SaldoLineChart);
