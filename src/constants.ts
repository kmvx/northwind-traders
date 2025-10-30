import {
  AxeIcon,
  CreditCardIcon,
  DollarSignIcon,
  EggFriedIcon,
  HouseIcon,
  type LucideIcon,
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
        icon: HouseIcon,
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
        icon: CreditCardIcon,
      },
      {
        title: 'Products',
        url: '/products',
        icon: EggFriedIcon,
      },
      {
        title: 'Suppliers',
        url: '/suppliers',
        icon: AxeIcon,
      },
    ],
  },
];
