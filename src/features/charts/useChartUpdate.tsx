'use client';

import { useLayoutEffect, useRef } from 'react';

const useChartUpdate = (
  updateCallback: ({ current }: { current: SVGSVGElement }) => void,
) => {
  // SVG chart
  const ref = useRef<SVGSVGElement>(null);
  useLayoutEffect(() => {
    function updateLocal() {
      const current = ref.current;
      if (!current) return;
      updateCallback({
        current,
      });
    }
    updateLocal();

    const element = ref.current?.parentElement;
    const resizeObserver = new ResizeObserver(updateLocal);
    if (element) resizeObserver.observe(element);
    return () => {
      if (element) resizeObserver.unobserve(element);
    };
  }, [updateCallback]);

  return { ref };
};

export default useChartUpdate;
