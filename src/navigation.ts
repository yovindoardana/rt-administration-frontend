import { HomeIcon, UsersIcon, FolderIcon, CalendarIcon, DocumentDuplicateIcon, ChartPieIcon } from '@heroicons/react/24/outline';

// Pages
import DashboardPage from './pages/DashboardPage';
import HousesPage from './pages/master/HousesPage';
import ResidentPage from './pages/master/ResidentPage';
import HouseDetailPage from './pages/master/HouseDetailPage';
import OccupantsPage from './pages/master/OccupantsPage';

export interface NavRoute {
  name: string;
  path: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  element: React.ComponentType<any>;
  section?: string;
  hideInNav?: boolean;
}

const navigation: NavRoute[] = [
  { name: 'Dashboard', path: '/', icon: HomeIcon, element: DashboardPage },
  // Houses
  { name: 'Rumah', path: '/houses', icon: HomeIcon, element: HousesPage, section: 'Master Data' },
  { name: 'Detail Rumah', path: '/houses/:id', icon: HomeIcon, element: HouseDetailPage, section: 'Master Data', hideInNav: true },
  // { name: 'Tambah Rumah', path: '/houses/new', icon: HomeIcon, element: HouseCreatePage, section: 'Master Data' },
  // { name: 'Edit Rumah', path: '/houses/:id/edit', icon: HomeIcon, element: HouseEditPage, section: 'Master Data' },

  // Residents
  { name: 'Penghuni', path: '/residents', icon: UsersIcon, element: ResidentPage, section: 'Master Data' },

  // Occupants
  { name: 'Riwayat Penghunian', path: '/occupants', icon: HomeIcon, element: OccupantsPage, section: 'Master Data' },
  //   { name: 'Riwayat', path: '/histories', icon: FolderIcon, element: HistoryPage, section: 'Master Data' },
  //   { name: 'Iuran', path: '/payments', icon: CalendarIcon, element: PaymentsPage, section: 'Transaksi' },
  //   { name: 'Pengeluaran', path: '/expenses', icon: DocumentDuplicateIcon, element: ExpensesPage, section: 'Transaksi' },
  //   { name: 'Bulanan', path: '/reports/monthly', icon: ChartPieIcon, element: MonthlyReportPage, section: 'Laporan' },
  //   { name: 'Tahunan', path: '/reports/annual', icon: ChartPieIcon, element: AnnualReportPage, section: 'Laporan' },
];

export default navigation;
