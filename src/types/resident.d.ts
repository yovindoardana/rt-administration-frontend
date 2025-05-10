// 1. Tipe dasar penghuni
export interface Resident {
  id: number;
  full_name: string;
  id_card: string | null;
  residency_status: 'permanent' | 'contract';
  phone_number: string;
  marital_status: 'married' | 'single';
  created_at: string;
  updated_at: string;
}

// 2. Tipe untuk objek `links` di root
export interface PaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

// 3. Tipe untuk setiap item di `meta.links` array
export interface MetaLinkItem {
  url: string | null;
  label: string;
  active: boolean;
}

// 4. Tipe untuk `meta`
export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: MetaLinkItem[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

// 5. Tipe response keseluruhan
export interface ResidentsResponse {
  data: Resident[];
  links: PaginationLinks;
  meta: PaginationMeta;
}
