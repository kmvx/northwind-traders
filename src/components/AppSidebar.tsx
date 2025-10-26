import {
  AxeIcon,
  CreditCardIcon,
  DollarSignIcon,
  EggFriedIcon,
  HouseIcon,
  type LucideIcon,
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import { Fragment } from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { FullscreenToggle, ThemeToggle } from '@/ui';

import { Separator } from './ui';

const items: {
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
    title: 'Entites',
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

export default function AppSidebar() {
  return (
    <Sidebar
      style={{
        paddingLeft: 'env(safe-area-inset-left)',
      }}
    >
      <SidebarHeader
        style={{
          paddingTop: 'env(safe-area-inset-top)',
        }}
      >
        <Link
          href="/"
          className="text-4xl font-serif italic font-black drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-600 dark:from-blue-300 dark:to-teal-300"
        >
          Northwind Traders
        </Link>
        <Separator />
      </SidebarHeader>
      <SidebarContent>
        {items.map((item, index) => (
          <Fragment key={index}>
            {index > 0 && <Separator />}
            <SidebarGroup>
              {item.title && (
                <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
              )}
              <SidebarMenu>
                {item.children.map((child) => (
                  <SidebarMenuItem key={child.title}>
                    <SidebarMenuButton asChild>
                      <a href={child.url}>
                        <child.icon />
                        <span>{child.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </Fragment>
        ))}
        <Separator />
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="p-2 flex items-center gap-2">
              <ThemeToggle />
              <FullscreenToggle />
              <SidebarTrigger variant="outline" className="size-9" />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
