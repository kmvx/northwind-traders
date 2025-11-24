'use client';

import { useCallback, useState } from 'react';

import { FiltersToggleButton } from '@/ui';

export default function useFiltersToggle() {
  const [showFilters, setShowFilters] = useState(true);

  const getFiltersToggleButton = useCallback(
    () => (
      <FiltersToggleButton
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />
    ),
    [showFilters],
  );

  return {
    showFilters,
    getFiltersToggleButton,
  };
}
