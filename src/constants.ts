import {
  ChartSplineIcon,
  DollarSignIcon,
  EggFriedIcon,
  InfoIcon,
  // LayoutDashboardIcon,
  type LucideIcon,
  PickaxeIcon,
  ShoppingCartIcon,
  UserIcon,
} from 'lucide-react';

export const HIDE_DELAY = 2000; // in milliseconds

export const navigationItems: {
  title?: string;
  children: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
}[] = [
  {
    children: [
      {
        title: 'About',
        url: '/',
        icon: InfoIcon,
      },
      /*
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboardIcon,
      },
      */
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
      },
      {
        title: 'Employees',
        url: '/employees',
        icon: UserIcon,
      },
      {
        title: 'Orders',
        url: '/orders',
        icon: ShoppingCartIcon,
      },
      {
        title: 'Products',
        url: '/products',
        icon: EggFriedIcon,
      },
      {
        title: 'Suppliers',
        url: '/suppliers',
        icon: PickaxeIcon,
      },
    ],
  },
];
