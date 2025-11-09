'use client';

import { useEffect, useState } from 'react';

const WITE_BREAKPOINT = 1536;

type StateType = {
  width?: number;
  height?: number;
  isWidePage: boolean;
};

const getState = (): StateType => {
  return typeof window === 'undefined'
    ? { isWidePage: true }
    : {
        width: window.innerWidth,
        height: window.innerHeight,
        isWidePage: window.innerWidth >= WITE_BREAKPOINT,
      };
};

export default function usePageSize(): StateType {
  const [state, setState] = useState<StateType>(getState());

  useEffect(() => {
    const handleResize = () => setState(getState());

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return state;
}
