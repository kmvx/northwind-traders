import {
  AxeIcon,
  DollarSignIcon,
  HouseIcon,
  type LucideIcon,
  UserIcon,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

interface SidebarItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

const items: SidebarItem[] = [
  {
    title: 'About',
    url: '/',
    icon: HouseIcon,
  },
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
    title: 'Suppliers',
    url: '/suppliers',
    icon: AxeIcon,
  },
];

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
