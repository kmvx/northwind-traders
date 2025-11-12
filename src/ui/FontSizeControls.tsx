'use client';

import { AArrowDownIcon, AArrowUpIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui';

const config = {
  DEFAULT: 16,
  MIN: 12,
  MAX: 24,
  STEP: 4,
} as const;

export default function FontSizeControls() {
  const [fontSize, setFontSize] = useState<number>(config.DEFAULT);

  const changeFontSize = (newFontSize: number) => {
    const clampedFontSize = Math.min(
      Math.max(newFontSize, config.MIN),
      config.MAX,
    );
    setFontSize(clampedFontSize);
    document.documentElement.style.fontSize = `${clampedFontSize}px`;
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => changeFontSize(fontSize - config.STEP)}
        disabled={fontSize <= config.MIN}
        title="Decrease font size"
      >
        <AArrowDownIcon />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => changeFontSize(fontSize + config.STEP)}
        disabled={fontSize >= config.MAX}
        title="Increase font size"
      >
        <AArrowUpIcon />
      </Button>
    </div>
  );
}
