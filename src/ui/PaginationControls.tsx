import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react';

import { ButtonWithTooltip } from '.';

interface PaginationControlsProps {
  offset: number;
  limit: number;
  totalItems: number;
  goToPage: (page: number) => void;
  showAtLeastItemsCount: boolean;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  offset,
  limit,
  totalItems,
  goToPage,
  showAtLeastItemsCount,
}) => {
  const totalPages = Math.ceil(totalItems / limit);
  const currentPage = Math.floor(offset / limit);

  if (totalPages <= 1) {
    return showAtLeastItemsCount ? <div>{totalItems} items</div> : null;
  }

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
};

export default PaginationControls;
