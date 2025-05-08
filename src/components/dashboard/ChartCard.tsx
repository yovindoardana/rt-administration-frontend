import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
}

const ChartCard: React.FC<Props> = ({ title, children }) => (
  <div className='bg-white shadow rounded-lg p-4'>
    <h2 className='text-lg font-semibold mb-4'>{title}</h2>
    {children}
  </div>
);

export default React.memo(ChartCard);
