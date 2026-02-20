'use client';

import React, { useCallback, useEffect } from 'react';

import { useQueryStateFixed, useScrollTo } from '@/hooks';
import { cn } from '@/lib/utils';

import { PaginationControls } from '.';

const defaultLimit = 20;

interface PaginationProps<T> {
  suffix: string;
  data: T[];
  className?: string;
  extraNodesBefore?: React.ReactNode;
  extraNodesAfter?: React.ReactNode;
  renderPage: (visibleItems: T[]) => React.ReactNode;
}

function Pagination<T>({
  suffix,
  data,
  className,
  extraNodesBefore,
  extraNodesAfter,
  renderPage,
}: PaginationProps<T>) {
  const [limit, setLimit] = useQueryStateFixed('limit' + suffix, {
    defaultValue: defaultLimit,
    parse: Number,
  });

  const [offset, setOffset] = useQueryStateFixed('offset' + suffix, {
    defaultValue: 0,
    parse: Number,
  });

  // Reset to first page when data changes
  useEffect(() => {
    setOffset(0);
  }, [data, setOffset]);

  const totalItems = data.length;

  const visibleItems = data.slice(offset, offset + limit);

  const { scrollToRef, scrollTo } = useScrollTo();

  const goToPage = useCallback(
    (page: number) => {
      const newOffset = Math.max(0, Math.min(totalItems - 1, page * limit));
      setOffset(newOffset);
      scrollTo();
    },
    [limit, totalItems, setOffset, scrollTo],
  );

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <PaginationControls
        offset={offset}
        limit={limit}
        setLimit={setLimit}
        totalItems={totalItems}
        goToPage={goToPage}
        showAtLeastItemsCount
        extraNodesBefore={extraNodesBefore}
        extraNodesAfter={extraNodesAfter}
        ref={scrollToRef}
      />
      {renderPage(visibleItems)}
      <PaginationControls
        offset={offset}
        limit={limit}
        setLimit={setLimit}
        totalItems={totalItems}
        goToPage={goToPage}
        showAtLeastItemsCount={false}
      />
    </div>
  );
}

export default Pagination;
