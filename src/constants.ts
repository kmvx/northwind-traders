import {
  ChartSplineIcon,
  DollarSignIcon,
  EggFriedIcon,
  InfoIcon,
  LayoutDashboardIcon,
  type LucideIcon,
  PickaxeIcon,
  ShoppingCartIcon,
  UserIcon,
} from 'lucide-react';

import type { DBStatsType } from './db/actions';

export const HIDE_DELAY = 2000; // in milliseconds

export const navigationItems: {
  title?: string;
  children: {
    title: string;
    url: string;
    icon: LucideIcon;
    getBadgeValue?: (stats: DBStatsType) => number;
  }[];
}[] = [
  {
    children: [
      {
        title: 'About',
        url: '/',
        icon: InfoIcon,
      },
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboardIcon,
      },
      {
        title: 'Charts',
        url: '/charts',
        icon: ChartSplineIcon,
      },
    ],
  },
  {
    title: 'Entities',
    children: [
      {
        title: 'Customers',
        url: '/customers',
        icon: DollarSignIcon,
        getBadgeValue: (stats: DBStatsType) => stats.customersCount,
      },
      {
        title: 'Employees',
        url: '/employees',
        icon: UserIcon,
        getBadgeValue: (stats: DBStatsType) => stats.employeesCount,
      },
      {
        title: 'Orders',
        url: '/orders',
        icon: ShoppingCartIcon,
        getBadgeValue: (stats: DBStatsType) => stats.ordersCount,
      },
      {
        title: 'Products',
        url: '/products',
        icon: EggFriedIcon,
        getBadgeValue: (stats: DBStatsType) => stats.productsCount,
      },
      {
        title: 'Suppliers',
        url: '/suppliers',
        icon: PickaxeIcon,
        getBadgeValue: (stats: DBStatsType) => stats.suppliersCount,
      },
    ],
  },
];
