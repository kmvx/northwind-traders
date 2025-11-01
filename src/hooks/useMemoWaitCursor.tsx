'use client';

import React, { useEffect, useState } from 'react';

export default function useMemoWaitCursor<T>(
  factory: () => T,
  deps: React.DependencyList | undefined,
): T | undefined {
  //return useMemo(factory, deps);

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

  return value;
}
