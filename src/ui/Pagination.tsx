'use client';

import clsx from 'clsx';
import React, { useCallback, useEffect } from 'react';

import { useQueryStateFixed } from '@/hooks';

import { PaginationControls } from '.';

type PaginationProps<T> = {
  data: T[];
  defaultLimit: number;
  className?: string;
  extraNodesBefore?: React.ReactNode;
  extraNodesAfter?: React.ReactNode;
  renderPage: (visibleItems: T[]) => React.ReactNode;
};

function Pagination<T>({
  data,
  defaultLimit,
  className,
  extraNodesBefore,
  extraNodesAfter,
  renderPage,
}: PaginationProps<T>) {
  const [limit] = useQueryStateFixed('limit', {
    defaultValue: defaultLimit,
    parse: Number,
  });

  const [offset, setOffset] = useQueryStateFixed('offset', {
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
        showAtLeastItemsCount
        extraNodesBefore={extraNodesBefore}
        extraNodesAfter={extraNodesAfter}
      />
      {renderPage(visibleItems)}
      <PaginationControls
        offset={offset}
        limit={limit}
        totalItems={totalItems}
        goToPage={goToPage}
        showAtLeastItemsCount={false}
      />
    </div>
  );
}

export default Pagination;
