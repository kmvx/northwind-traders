import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react';

import { ButtonWithTooltip, PaginationLimitSelect } from '.';

interface PaginationControlsProps {
  offset: number;
  limit: number;
  setLimit?: ((limit: number) => void) | undefined;
  totalItems: number;
  goToPage: (page: number) => void;
  showAtLeastItemsCount: boolean;
  extraNodesBefore?: React.ReactNode;
  extraNodesAfter?: React.ReactNode;
  ref?: React.RefObject<HTMLDivElement | null>;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  offset,
  limit,
  totalItems,
  goToPage,
  setLimit,
  showAtLeastItemsCount,
  extraNodesBefore,
  extraNodesAfter,
  ref,
}) => {
  const totalPages = Math.ceil(totalItems / limit);
  const currentPage = Math.floor(offset / limit);

  const getLimitSelect = () => {
    if (!setLimit || totalItems <= 10) return null;
    return <PaginationLimitSelect limit={limit} setLimit={setLimit} />;
  };

  if (totalPages <= 1) {
    return showAtLeastItemsCount ? (
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {extraNodesBefore}
          <span className="mx-2">{totalItems} items</span>
          {getLimitSelect()}
        </div>
        {extraNodesAfter}
      </div>
    ) : null;
  }

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-2"
      ref={ref}
    >
      <div className="flex flex-wrap items-center justify-start gap-4">
        {extraNodesBefore}

        <div className="flex items-center gap-2">
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
        </div>

        <span className="text-center text-sm text-balance">
          Items {offset + 1} - {Math.min(offset + limit, totalItems)} of{' '}
          {totalItems}, page {currentPage + 1} of {totalPages}
        </span>

        <div className="flex items-center gap-2">
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

        {getLimitSelect()}
      </div>
      <div>{extraNodesAfter}</div>
    </div>
  );
};

export default PaginationControls;
