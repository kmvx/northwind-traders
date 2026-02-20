'use client';

import { PaintbrushVerticalIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import invariant from 'tiny-invariant';

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
  forceDarkSidebar: boolean;
}

let state: ThemeState;

const randInt = (max: number) => Math.round(Math.random() * max);

const generateState = () => {
  state = {
    hue: Math.floor(Math.random() * 360),
    lightness: randInt(10),
    borderAlpha: Math.round(Math.random() * 4) / 10 + 0.1,
    radius: Math.random() < 0.2 ? 0 : (Math.round(Math.random() * 5) / 5) * 2,
    forceDarkSidebar: Math.random() < 0.5,
  };
};

function updateTheme(isDark: boolean) {
  if (!state) return;

  const { hue, lightness } = state;
  const lightnessValue = isDark ? lightness : 100 - lightness;
  const borderColor = `hsl(${hue} 100% ${100 - lightnessValue}% / ${state.borderAlpha})`;

  const buildColor = (delta: number, isDark: boolean) => {
    return `hsl(${hue} 100% ${isDark ? lightness + delta : 100 - (lightness + delta)}%)`;
  };

  const backgroundColor = buildColor(0, isDark);
  const panelColor = buildColor(5, isDark);
  const accentColor = buildColor(10, isDark);

  const isDarkSidebar = state.forceDarkSidebar || isDark;
  const sidebarColor = buildColor(5, isDarkSidebar);
  const sidebarForegroundColor = isDarkSidebar
    ? 'oklch(0.985 0 0)'
    : 'oklch(0.145 0 0)';
  const sidebarAccentColor = buildColor(10, isDarkSidebar);
  const sidebarAccentForegroundColor = isDarkSidebar
    ? 'oklch(0.985 0 0)'
    : 'oklch(0.205 0 0)';

  Object.entries({
    '--background': backgroundColor,
    '--card': backgroundColor,
    '--primary': `hsl(${hue} 100% ${100 - lightnessValue}%)`,
    '--secondary': accentColor,
    '--muted': accentColor,
    '--accent': accentColor,
    '--panel': panelColor, // NOTE: app extension
    '--sidebar': sidebarColor,
    '--sidebar-foreground': sidebarForegroundColor,
    '--sidebar-accent': sidebarAccentColor,
    '--sidebar-accent-foreground': sidebarAccentForegroundColor,
    '--border': borderColor,
    '--input': borderColor,
    '--ring': borderColor,
    '--radius': state.radius + 'rem',
  }).forEach(([name, value]) => {
    document.documentElement.style.setProperty(name, value);
  });

  const sidebarElement = document.querySelector('[data-sidebar="sidebar"]');
  invariant(sidebarElement);
  invariant(sidebarElement instanceof HTMLElement);
  Object.entries({
    '--accent': sidebarAccentColor,
    '--accent-foreground': sidebarAccentForegroundColor,
    '--secondary': sidebarAccentColor,
    '--secondary-foreground': sidebarAccentForegroundColor,
  }).forEach(([name, value]) => {
    sidebarElement.style.setProperty(name, value);
  });
}

export default ThemeCustomToggle;
