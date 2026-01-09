'use client';

import { PaintbrushVerticalIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

import { Button } from '@/components/ui';

const ThemeCustomToggle: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // Update theme on dark/light theme change
  useEffect(() => {
    updateTheme(isDark);
  }, [isDark]);

  const handleClick = () => {
    generateState();
    updateTheme(isDark);
  };

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      size="icon"
      title="Toggle to Custom Theme"
    >
      <PaintbrushVerticalIcon className="size-[1.2rem]" />
    </Button>
  );
};

interface ThemeState {
  hue: number;
  lightness: number;
  borderAlpha: number;
  radius: number;
}

let state: ThemeState;

const randInt = (max: number) => Math.round(Math.random() * max);

const generateState = () => {
  state = {
    hue: Math.floor(Math.random() * 360),
    lightness: randInt(10),
    borderAlpha: Math.round(Math.random() * 4) / 10 + 0.1,
    radius: Math.random() < 0.2 ? 0 : (Math.round(Math.random() * 5) / 5) * 2,
  };
};

function updateTheme(isDark: boolean) {
  if (!state) return;

  const { hue, lightness } = state;
  const lightnessValue = isDark ? lightness : 100 - lightness;
  const borderColor = `hsl(${hue} 100% ${100 - lightnessValue}% / ${state.borderAlpha})`;
  const buildColor = (delta: number) =>
    `hsl(${hue} 100% ${isDark ? lightness + delta : 100 - lightness - delta}%)`;
  const background = buildColor(0);
  const panel = buildColor(5);
  const accent = buildColor(10);

  [
    ['--background', background],
    ['--card', background],
    ['--primary', `hsl(${hue} 100% ${100 - lightnessValue}%)`],
    ['--secondary', accent],
    ['--muted', accent],
    ['--accent', accent],
    ['--sidebar', panel],
    ['--sidebar-accent', accent],
    ['--border', borderColor],
    ['--input', borderColor],
    ['--ring', borderColor],
    ['--radius', state.radius + 'rem'],
  ].forEach(([name, value]) => {
    document.documentElement.style.setProperty(name, value);
  });
}

export default ThemeCustomToggle;
