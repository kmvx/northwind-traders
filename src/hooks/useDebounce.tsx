'use client';

import { useEffect, useState } from 'react';

function useDebounce<T>(
  value: T,
  delay?: number,
): { debouncedValue: T; isDebouncing: boolean } {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return { debouncedValue, isDebouncing: value !== debouncedValue };
}

export default useDebounce;
