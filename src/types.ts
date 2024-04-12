import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export interface SidebarMenu extends SidebarItem {
  operator_menu_permission?: number;
  depth: number;
  sort_order: number;
  menus?: SidebarMenu[];
}
export interface SidebarItem {
  label: string;
  href: string;
  icon?: LucideIcon;
}

export interface SidebarItems {
  links: Array<SidebarMenu>;
  extras?: ReactNode;
}
