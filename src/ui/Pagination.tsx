'use client';

import clsx from 'clsx';
import { useQueryState } from 'nuqs';
import React, { useCallback, useEffect } from 'react';

import { PaginationControls } from '.';

type PaginationProps<T> = {
  data: T[];
  renderPage: (visibleItems: T[]) => React.ReactNode;
  defaultLimit: number;
  className?: string;
};

export default function Pagination<T>({
  data,
  renderPage,
  defaultLimit,
  className,
}: PaginationProps<T>) {
  const [limit] = useQueryState('limit', {
    defaultValue: defaultLimit,
    parse: Number,
  });

  const [offset, setOffset] = useQueryState('offset', {
    defaultValue: 0,
    parse: Number,
  });

  useEffect(() => {
    setOffset(0);
  }, [data, setOffset]);

  const totalItems = data.length;

  const visibleItems = data.slice(offset, offset + limit);

  const goToPage = useCallback(
    (page: number) => {
      const newOffset = Math.max(0, Math.min(totalItems - 1, page * limit));
      setOffset(newOffset);
    },
    [limit, totalItems, setOffset],
  );

  return (
    <div className={clsx('flex flex-col gap-4', className)}>
      <PaginationControls
        offset={offset}
        limit={limit}
        totalItems={totalItems}
        goToPage={goToPage}
      />
      {renderPage(visibleItems)}
      <PaginationControls
        offset={offset}
        limit={limit}
        totalItems={totalItems}
        goToPage={goToPage}
      />
    </div>
  );
}
