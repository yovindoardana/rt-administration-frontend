// src/pages/master/PaymentsPage.tsx
import { useState } from 'react';
import { PaymentForm } from '@/features/payment/components/PaymentForm';
import { PaymentTable } from '@/features/payment/components/PaymentTable';

export default function PaymentsPage() {
  const [refreshFlag, setRefreshFlag] = useState(0);

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-semibold mb-4'>Master Pembayaran</h1>
      <PaymentForm onAdded={() => setRefreshFlag((f) => f + 1)} />
      <PaymentTable key={refreshFlag} />
    </div>
  );
}
