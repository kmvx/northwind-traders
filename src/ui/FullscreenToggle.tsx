'use client';

import { MaximizeIcon, MinimizeIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui';

interface FullscreenToggleProps {
  variant?: React.ComponentProps<typeof Button>['variant'];
  className?: string;
}

const FullscreenToggle: React.FC<FullscreenToggleProps> = ({
  variant,
  className,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleChange);
    return () => document.removeEventListener('fullscreenchange', handleChange);
  }, []);

  const toggleFullscreen = () => {
    const element = document.documentElement;

    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    } else {
      element.requestFullscreen();
      setIsFullscreen(true);
    }
  };

  return (
    <Button
      variant={variant}
      size="icon"
      className={className}
      onClick={toggleFullscreen}
      title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
    >
      {isFullscreen ? <MinimizeIcon /> : <MaximizeIcon />}
    </Button>
  );
};

export default FullscreenToggle;
