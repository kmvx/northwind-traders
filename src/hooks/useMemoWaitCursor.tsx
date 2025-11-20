'use client';

import React, { useEffect, useMemo, useState } from 'react';

export default function useMemoWaitCursor<T>(
  factory: () => T,
  deps: React.DependencyList,
): T | undefined {
  // return useMemo(factory, deps);

  // Waiting state
  const [isWaiting, setIsWaiting] = useState(false);
  useEffect(() => {
    ['cursor-wait', '[*]:cursor-wait'].forEach((token) =>
      document.documentElement.classList.toggle(token, isWaiting),
    );
    return () => {
      ['cursor-wait', '[*]:cursor-wait'].forEach((token) =>
        document.documentElement.classList.remove(token),
      );
    };
  }, [isWaiting]);

  // Value state
  const [value, setValue] = useState<T>();
  useEffect(() => {
    if (typeof window === 'undefined') return;

    setIsWaiting(true);
    // Timeout to render a new cursor
    setTimeout(() => {
      try {
        setValue(factory());
      } finally {
        setIsWaiting(false);
      }
    }, 50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const serverValue = useMemo(() => {
    if (typeof window !== 'undefined') return;
    return factory();
    // Don't include factory in deps to omit infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return value ?? serverValue;
}
