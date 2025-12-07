import { useCallback } from 'react';

import { useSidebar } from '@/components/ui/sidebar';

export default function useCloseSidebar() {
  const { isMobile, setOpenMobile } = useSidebar();

  return useCallback(() => {
    if (!isMobile) return;

    setOpenMobile(false);
  }, [isMobile, setOpenMobile]);
}
