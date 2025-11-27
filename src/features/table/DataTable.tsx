'use client';

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  type TableMeta,
  useReactTable,
} from '@tanstack/react-table';
import { useCallback, useEffect } from 'react';

const defaultLimit = 20;

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useQueryStateFixed, useScrollTo } from '@/hooks';
import { PaginationControls } from '@/ui';

interface DataTableProps<TData> {
  suffix: string;
  data: TData[];
  columns: ColumnDef<TData>[];
  meta?: TableMeta<TData>;
  extraNodesBefore?: React.ReactNode;
  extraNodesAfter?: React.ReactNode;
}

function DataTable<TData>({
  suffix,
  data,
  columns,
  meta,
  extraNodesBefore,
  extraNodesAfter,
}: DataTableProps<TData>) {
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

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable<TData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageIndex: Math.floor(offset / limit),
        pageSize: limit,
      },
    },
    ...(meta ? { meta } : {}),
    // debugTable: process.env.NODE_ENV !== 'production',
  });

  const getHeader = () => (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead key={header.id} className="font-bold">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );

  const { scrollToRef, scrollTo } = useScrollTo();

  const totalItems = data.length;
  const goToPage = useCallback(
    (page: number) => {
      const newOffset = page * limit;
      setOffset(newOffset);
      scrollTo();
    },
    [limit, setOffset, scrollTo],
  );

  return (
    <div className="flex flex-col gap-4">
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
      <div className="overflow-hidden rounded-md border">
        <Table>
          {getHeader()}
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="even:bg-neutral-500/10"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {getHeader()}
        </Table>
      </div>
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

export default DataTable;
