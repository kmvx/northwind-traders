'use client';

import { AArrowDownIcon, AArrowUpIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { Button } from '@/components/ui';

const config = {
  DEFAULT: 16,
  MIN: 12,
  MAX: 24,
  STEP: 4,
} as const;

export default function FontSizeControls() {
  const [fontSize, setFontSize] = useLocalStorage<number>(
    'fontSize',
    config.DEFAULT,
  );

  const changeFontSize = (newFontSize: number) => {
    const clampedFontSize = Math.min(
      Math.max(newFontSize, config.MIN),
      config.MAX,
    );
    setFontSize(clampedFontSize);
  };

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => changeFontSize(fontSize - config.STEP)}
        disabled={fontSize <= config.MIN}
        title="Decrease font size"
      >
        <AArrowDownIcon className="size-[1.2rem]" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => changeFontSize(fontSize + config.STEP)}
        disabled={fontSize >= config.MAX}
        title="Increase font size"
      >
        <AArrowUpIcon className="size-[1.5rem]" />
      </Button>
    </div>
  );
}
