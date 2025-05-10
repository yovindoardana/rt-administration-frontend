import { useState, useEffect } from 'react';
import { getHouseDetail, getPayments, addOccupant, endOccupant, createPayment, updatePayment } from '@/services/house';
import type { HouseDetail, PaymentEntry } from '@/types/house';

export function useHouseDetail(id: number) {
  const [house, setHouse] = useState<HouseDetail | null>(null);
  const [payments, setPayments] = useState<PaymentEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    // 1. Fetch main detail
    getHouseDetail(id)
      .then((data) => setHouse(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
    // 2. Fetch payments
    getPayments(id)
      .then(setPayments)
      .catch((err) => console.error(err));
  }, [id]);

  // 3. Actions untuk occupant & payment
  const onAddOccupant = (resident_id: number, start_date: string) => addOccupant(id, { resident_id, start_date }).then((entry) => setHouse((h) => (h ? { ...h, occupant_history: [entry, ...h.occupant_history] } : h)));

  const onEndOccupant = (historyId: number, end_date: string) =>
    endOccupant(id, historyId, { end_date }).then((updated) =>
      setHouse((h) =>
        h
          ? {
              ...h,
              occupant_history: h.occupant_history.map((e) => (e.id === updated.id ? updated : e)),
            }
          : h
      )
    );

  const onCreatePayment = (resident_id: number, amount: number, payment_date: string, status: 'paid' | 'unpaid') => createPayment(id, { resident_id, amount, payment_date, status }).then((entry) => setPayments((ps) => [entry, ...ps]));

  const onUpdatePayment = (paymentId: number, status: 'paid' | 'unpaid') => updatePayment(id, paymentId, { status }).then((updated) => setPayments((ps) => ps.map((p) => (p.id === updated.id ? updated : p))));

  return {
    house,
    payments,
    loading,
    error,
    onAddOccupant,
    onEndOccupant,
    onCreatePayment,
    onUpdatePayment,
  };
}
