'use client';

import { useEffect, useState } from 'react';

const WIDE_BREAKPOINT_REM = 96;

type StateType = {
  isWidePage: boolean;
};

const remToPx = (rem: number): number => {
  const rootFontSize =
    typeof window === 'undefined'
      ? 16
      : parseFloat(getComputedStyle(document.documentElement).fontSize);
  return rem * rootFontSize;
};

const getState = (): StateType => {
  return typeof window === 'undefined'
    ? { isWidePage: true }
    : {
        isWidePage: window.innerWidth >= remToPx(WIDE_BREAKPOINT_REM),
      };
};

export default function usePageSize(): StateType {
  const [state, setState] = useState<StateType>(getState());

  useEffect(() => {
    const handleResize = () => setState(getState());

    window.addEventListener('resize', handleResize);
    const observer = new ResizeObserver(handleResize);
    observer.observe(document.documentElement);
    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  return state;
}
