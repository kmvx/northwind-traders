import { type ColumnDef, type RowData } from '@tanstack/react-table';
import React from 'react';

import { DataTable } from '@/features/table';
import type { ICategories, IProduct, IProducts } from '@/models';
import { useQueryCategories } from '@/net';
import { BasicLink } from '@/ui';
import { formatCurrency } from '@/utils';

import { CategoryName } from '.';

declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    dataCategories?: ICategories | undefined;
  }
}

const allColumns: ColumnDef<IProduct>[] = [
  {
    accessorKey: 'productId',
    header: '#',
  },
  {
    accessorKey: 'productName',
    header: 'Name',
    cell: ({ row }) => {
      const { productId, productName } = row.original;
      return (
        <BasicLink href={`/products/${productId}`}>{productName}</BasicLink>
      );
    },
  },
  {
    accessorKey: 'categoryId',
    header: 'Category',
    cell: ({ row, table }) => {
      return (
        <CategoryName
          dataCategories={table?.options?.meta?.dataCategories}
          categoryId={row.original.categoryId}
        />
      );
    },
  },
  {
    accessorKey: 'quantityPerUnit',
    header: 'Quantity per Unit',
  },
  {
    accessorKey: 'unitPrice',
    header: 'Unit price',
    cell: ({ row }) => {
      return formatCurrency(row.original.unitPrice);
    },
  },
  {
    accessorKey: 'unitsInStock',
    header: 'Units in Stock',
  },
  {
    accessorKey: 'unitsOnOrder',
    header: 'Units on Order',
  },
  {
    accessorKey: 'reorderLevel',
    header: 'Reorder Level',
  },
  {
    accessorKey: 'discontinued',
    header: 'Discontinued',
    cell: ({ row }) => {
      return row.original.discontinued ? 'Discontinued' : 'Active';
    },
  },
];

interface ProductsTableProps {
  data: IProducts;
  extraNodes?: React.ReactNode;
}

const ProductsTable: React.FC<ProductsTableProps> = ({ data, extraNodes }) => {
  const { data: dataCategories } = useQueryCategories();

  return (
    <DataTable
      data={data}
      columns={allColumns}
      meta={{ dataCategories }}
      extraNodes={extraNodes}
    />
  );
};

export default ProductsTable;
