import { type ColumnDef, type RowData } from '@tanstack/react-table';
import React, { useMemo } from 'react';

import { DataTable } from '@/features/table';
import type { ICategories, IProduct, IProducts, ISuppliers } from '@/models';
import { useQueryCategories, useQuerySuppliers } from '@/net';
import { BasicLink } from '@/ui';
import { formatCurrency } from '@/utils';

import { SupplierPreview } from '../suppliers';
import { Category } from '.';

declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    dataCategories?: ICategories | undefined;
    dataSuppliers?: ISuppliers | undefined;
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
        <Category
          dataCategories={table?.options?.meta?.dataCategories}
          categoryId={row.original.categoryId}
        />
      );
    },
  },
  {
    accessorKey: 'supplierId',
    header: 'Supplier',
    cell: ({ row, table }) => {
      return (
        <SupplierPreview
          dataSuppliers={table?.options?.meta?.dataSuppliers}
          supplierId={row.original.supplierId}
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
  extraNodesBefore?: React.ReactNode;
  isSupplierPage: boolean;
}

const ProductsTable: React.FC<ProductsTableProps> = ({
  data,
  extraNodesBefore,
  isSupplierPage,
}) => {
  const { data: dataCategories } = useQueryCategories();
  const { data: dataSuppliers } = useQuerySuppliers({
    enabled: !isSupplierPage,
  });

  const columns = useMemo(() => {
    return allColumns.filter((column) => {
      if ('accessorKey' in column) {
        if (isSupplierPage && column.accessorKey === 'supplierId') return false;
      }
      return true;
    });
  }, [isSupplierPage]);

  return (
    <DataTable
      suffix="Products"
      data={data}
      columns={columns}
      meta={{ dataCategories, dataSuppliers }}
      extraNodesBefore={extraNodesBefore}
    />
  );
};

export default ProductsTable;
