import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useCallback } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { IProduct, IProducts } from '@/models';
import { PaginationControls } from '@/ui';

const columns: ColumnDef<IProduct>[] = [
  {
    accessorKey: 'productName',
    header: 'Name',
  },
  {
    accessorKey: 'quantityPerUnit',
    header: 'Quantity per Unit',
  },
].map((column) => ({
  ...column,
  header: () => <div className="text-center font-bold">{column.header}</div>,
}));

export default function ProductsTable({ data }: { data: IProducts }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
  });

  const getHeader = () => (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead key={header.id}>
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

  const pagination = table.getState().pagination;
  const offset = pagination.pageIndex * pagination.pageSize;
  const limit = pagination.pageSize;
  const totalItems = data.length;
  const goToPage = useCallback(
    (page: number) => {
      table.setPageIndex(page);
    },
    [table],
  );

  return (
    <div className="flex flex-col gap-4">
      <PaginationControls
        offset={offset}
        limit={limit}
        totalItems={totalItems}
        goToPage={goToPage}
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
        </Table>
      </div>
      <PaginationControls
        offset={offset}
        limit={limit}
        totalItems={totalItems}
        goToPage={goToPage}
      />
    </div>
  );
}
