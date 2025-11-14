'use client';

import { useTheme } from 'next-themes';
import { useEffect } from 'react';

let wasInitialized = false;

const randInt = (max: number) => Math.round(Math.random() * max);

function updateTheme(isDark: boolean) {
  if (typeof document === 'undefined') return;
  if (!wasInitialized) return;

  const hue = Math.floor(Math.random() * 360);
  const lightnessRand = randInt(10);
  const lightness = isDark ? lightnessRand : 100 - lightnessRand;
  const borderColor = `hsl(${hue} 100% ${100 - lightness}% / ${Math.round(Math.random() * 4) / 10 + 0.1})`;
  const buildColor = (delta: number) =>
    `hsl(${hue} 100% ${isDark ? lightnessRand + delta : 100 - lightnessRand - delta}%)`;
  const background = buildColor(0);
  const panel = buildColor(5);
  const accent = buildColor(10);

  [
    ['--background', background],
    ['--card', background],
    ['--primary', `hsl(${hue} 100% ${100 - lightness}%)`],
    ['--secondary', accent],
    ['--muted', accent],
    ['--accent', accent],
    ['--sidebar', panel],
    ['--sidebar-accent', accent],
    ['--border', borderColor],
    ['--input', borderColor],
    ['--ring', borderColor],
    [
      '--radius',
      Math.random() < 0.2
        ? '0'
        : (Math.round(Math.random() * 5) / 5) * 2 + 'rem',
    ],
  ].forEach(([name, value]) => {
    document.documentElement.style.setProperty(name, value);
  });
}

updateTheme(false);

function initTheme(isDark: boolean) {
  updateTheme(isDark);

  document.documentElement.addEventListener('click', (event) => {
    if (event.ctrlKey && event.altKey) wasInitialized = true;
    updateTheme(isDark);
  });
}

export default function useInit() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    initTheme(isDark);
  }, [isDark]);
}
