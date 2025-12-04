'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
import { User } from '@/features/auth';
import {
  FontSizeControls,
  FullscreenToggle,
  Logo,
  NavigateButton,
  QueryFetchingIndicator,
  ThemeCustomToggle,
  ThemeToggle,
} from '@/ui';

import { Separator } from './ui';

const AppSidebar: React.FC = () => {
  const pathname = usePathname();
  const isActive = (url: string): boolean =>
    pathname === url || (pathname.startsWith(url) && url !== '/');

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
      </SidebarHeader>
      <Separator />
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
                    <SidebarMenuButton
                      isActive={isActive(child.url)}
                      asChild
                      className="h-max-sm:py-0"
                    >
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
            <div className="h-max-sm:py-0 flex flex-col gap-2 p-2">
              <div className="flex gap-2">
                <ThemeToggle />
                <FontSizeControls />
                <SidebarTrigger variant="outline" className="size-9" />
                <QueryFetchingIndicator />
              </div>
              <div className="flex gap-2">
                <ThemeCustomToggle />
                <NavigateButton isMoveBackward />
                <NavigateButton isMoveBackward={false} />
                <FullscreenToggle />
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="h-max-sm:flex hidden">
          <Logo />
        </SidebarGroup>
      </SidebarContent>
      <Separator />
      <SidebarFooter>
        <User />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
