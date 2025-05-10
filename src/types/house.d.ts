export interface House {
  id: number;
  house_number: string;
  status: 'occupied' | 'vacant';
  created_at: string;
  updated_at: string;
}

export interface ResidentHistoryEntry {
  id: number;
  resident: {
    id: number;
    full_name: string;
    phone?: string;
  };
  start_date: string;
  end_date: string | null;
  is_current: boolean;
}

export interface PaymentEntry {
  id: number;
  resident: {
    id: number;
    full_name: string;
  };
  amount: number;
  payment_date: string;
  status: 'paid' | 'unpaid';
}

export interface HouseDetail extends House {
  is_occupied: boolean;
  current_resident: { id: number; name: string } | null;
  occupant_history: ResidentHistoryEntry[];
  payment_history: PaymentEntry[];
}
