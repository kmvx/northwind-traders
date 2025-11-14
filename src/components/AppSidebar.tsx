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
import { navigationItems } from '@/constants';
import { FontSizeControls, FullscreenToggle, Logo, ThemeToggle } from '@/ui';

import { Separator } from './ui';

const AppSidebar: React.FC = () => {
  return (
    <Sidebar
      style={{
        paddingLeft: 'env(safe-area-inset-left)',
      }}
    >
      <SidebarHeader
        className="h-max-sm:hidden"
        style={{
          paddingTop: 'env(safe-area-inset-top)',
        }}
      >
        <Logo />
        <Separator />
      </SidebarHeader>
      <SidebarContent className="h-max-sm:gap-0">
        {navigationItems.map((item, index) => (
          <Fragment key={index}>
            {index > 0 && <Separator />}
            <SidebarGroup>
              {item.title && (
                <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
              )}
              <SidebarMenu className="h-max-sm:gap-0">
                {item.children.map((child) => (
                  <SidebarMenuItem key={child.title}>
                    <SidebarMenuButton asChild className="h-max-sm:py-0">
                      <Link href={child.url}>
                        <child.icon />
                        <span>{child.title}</span>
                      </Link>
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
            <div className="h-max-sm:py-0 p-2 flex items-center gap-2">
              <ThemeToggle />
              <FullscreenToggle />
              <FontSizeControls />
              <SidebarTrigger variant="outline" className="size-9" />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="hidden h-max-sm:flex">
          <Logo />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
