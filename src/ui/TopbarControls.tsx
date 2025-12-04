'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';

import { FullscreenToggle } from '.';

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
    </div>
  );
};

export default TopbarControls;
