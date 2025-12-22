'use client';

import { LayoutDashboardIcon } from 'lucide-react';

import { SidebarTrigger } from '@/components/ui/sidebar';

import { BasicLink, FullscreenToggle } from '.';

const TopbarControls: React.FC = () => {
  return (
    <div
      className="flex gap-2 p-2 sm:absolute sm:top-2 sm:left-2"
      style={{
        marginLeft: 'env(safe-area-inset-left)',
      }}
    >
      <SidebarTrigger variant="outline" className="size-9 bg-transparent" />
      <FullscreenToggle className="bg-transparent sm:hidden" />
      <BasicLink
        href="/dashboard"
        variant="outline"
        size="icon"
        title="Dashboard"
        className="sm:hidden"
      >
        <LayoutDashboardIcon />
      </BasicLink>
    </div>
  );
};

export default TopbarControls;
