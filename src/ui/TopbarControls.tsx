'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';

import { FullscreenToggle } from '.';

const TopbarControls: React.FC = () => {
  return (
    <div
      className="p-2 sm:absolute sm:top-2 sm:left-2 flex gap-2"
      style={{
        marginLeft: 'env(safe-area-inset-left)',
      }}
    >
      <SidebarTrigger variant="outline" className="size-9 bg-transparent" />
      <FullscreenToggle className="sm:hidden bg-transparent" />
    </div>
  );
};

export default TopbarControls;
