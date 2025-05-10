export interface DashboardData {
  user: { name: string };
  stats: {
    totalHouses: number;
    totalResidents: number;
    monthIncome: number;
    monthExpense: number;
    dueThisWeek: number;
  };
  annual: { month: number; income: number; expense: number }[];
  balances: { month: number; balance: number }[];
  recent: {
    payments: RecentPayment[];
    expenses: RecentExpense[];
  };
  overdues: Overdue[];
  agendas: Agenda[];
  reports: { monthly: string; annual: string };
}

export interface RecentPayment {
  payment_date: string;
  house_id: string;
  resident_name: string;
  amount: number;
}
export interface RecentExpense {
  expense_date: string;
  category: string;
  description: string;
  amount: number;
}
export interface Overdue {
  house_id: string;
  resident_name: string;
  due_date: string;
  amount: number;
}
export interface Agenda {
  event_date: string;
  title: string;
  description: string;
}
