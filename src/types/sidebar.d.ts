import { ComponentType, SVGProps } from 'react';

export interface NavItem {
  name: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  current?: boolean;
}

export interface SidebarSection {
  title?: string;
  items: NavItem[];
}

export interface SidebarContentProps {
  sections: SidebarSection[];
  logoSrc: string;
  onLogout?: () => void;
}

export interface SidebarProps {
  sections: SidebarSection[];
  logoSrc: string;
  sidebarOpen: boolean;
  onClose: () => void;
}

export interface LayoutProps {
  sections: SidebarSection[];
  logoSrc: string;
  children: React.ReactNode;
}

export type Section = SidebarSection;
