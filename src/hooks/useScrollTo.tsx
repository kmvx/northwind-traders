'use client';

import { useCallback, useRef } from 'react';
import invariant from 'tiny-invariant';

const useScrollTo = () => {
  const scrollToRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback(() => {
    const element = scrollToRef.current;
    invariant(element);

    const rect = element.getBoundingClientRect();
    const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
    if (isVisible) return;

    element.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return { scrollToRef, scrollTo };
};

export default useScrollTo;
