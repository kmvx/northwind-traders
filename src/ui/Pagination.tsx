'use client';

import clsx from 'clsx';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react';
import { useQueryState } from 'nuqs';
import React, { useCallback, useEffect } from 'react';

import { ButtonWithTooltip } from '.';

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

function PaginationControls({
  offset,
  limit,
  totalItems,
  goToPage,
}: {
  offset: number;
  limit: number;
  totalItems: number;
  goToPage: (page: number) => void;
}) {
  const totalPages = Math.ceil(totalItems / limit);
  const currentPage = Math.floor(offset / limit);
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-2">
      <ButtonWithTooltip
        title="Go to the First Page"
        variant="outline"
        size="icon"
        onClick={() => goToPage(0)}
        disabled={currentPage === 0}
      >
        <ChevronsLeftIcon className="size-4" />
      </ButtonWithTooltip>

      <ButtonWithTooltip
        title="Go to the Previous Page"
        variant="outline"
        size="icon"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 0}
      >
        <ChevronLeftIcon className="size-4" />
      </ButtonWithTooltip>

      <span className="px-3 text-sm">
        Items {offset + 1} - {Math.min(offset + limit, totalItems)} of{' '}
        {totalItems}, page {currentPage + 1} of {totalPages}
      </span>

      <ButtonWithTooltip
        title="Go to the Next Page"
        variant="outline"
        size="icon"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
      >
        <ChevronRightIcon className="size-4" />
      </ButtonWithTooltip>

      <ButtonWithTooltip
        title="Go to the Last Page"
        variant="outline"
        size="icon"
        onClick={() => goToPage(totalPages - 1)}
        disabled={currentPage === totalPages - 1}
      >
        <ChevronsRightIcon className="size-4" />
      </ButtonWithTooltip>
    </div>
  );
}
