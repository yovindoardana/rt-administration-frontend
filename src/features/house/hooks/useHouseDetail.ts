import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import type { HouseDetail } from '@/types/house';
import { useOccupants } from '@/features/occupant/hooks/useOccupant';
import { usePayments } from '@/features/payment/hooks/usePayments';
import { occupantService } from '@/features/occupant/services/occupant';
import { paymentService } from '@/features/payment/services/payment';

export function useHouseDetail(houseId: number) {
  const detailQ = useQuery<HouseDetail, Error>({
    queryKey: ['house', houseId],
    queryFn: () => api.get<HouseDetail>(`/api/houses/${houseId}`).then((r) => r.data),
  });

  const occQ = useOccupants({ house_id: houseId, initialPage: 1 });

  const payQ = usePayments({ house_id: houseId, initialPage: 1 });

  async function onAddOccupant(resident_id: number, start_date: string) {
    await occupantService.create(houseId, { resident_id, start_date });
    await occQ.refetch();
  }
  async function onEndOccupant(historyId: number, end_date: string) {
    await occupantService.end(historyId, end_date);
    await occQ.refetch();
  }
  async function onCreatePayment(resident_id: number, amount: number, payment_date: string, status: 'paid' | 'unpaid') {
    await paymentService.create(houseId, { resident_id, amount, payment_date, status });
    await payQ.refetch();
  }
  async function onUpdatePayment(id: number, status: 'paid' | 'unpaid') {
    await paymentService.updateStatus(id, status);
    await payQ.refetch();
  }

  return {
    house: detailQ.data,
    loading: detailQ.isLoading,
    error: detailQ.error,

    occupantHistory: occQ.data,
    occupantMeta: occQ.meta,
    occupantPage: occQ.page,
    setOccupantPage: occQ.setPage,
    occLoading: occQ.loading,
    occError: occQ.error,
    onAddOccupant,
    onEndOccupant,

    paymentHistory: payQ.data,
    paymentMeta: payQ.meta,
    paymentPage: payQ.page,
    setPaymentPage: payQ.setPage,
    payLoading: payQ.loading,
    payError: payQ.error,
    onCreatePayment,
    onUpdatePayment,
  };
}
