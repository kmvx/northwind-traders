import type { ColumnDef, RowData } from '@tanstack/react-table';
import React from 'react';

import { Spinner } from '@/components/ui';
import { DataTable } from '@/features/table';
import type { IOrderDetail, IOrderDetails, IProducts } from '@/models';
import { BasicLink } from '@/ui';

import { getTotalCost, roundMoney } from './utils';

declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    dataProducts?: IProducts | undefined;
  }
}

const allColumns: ColumnDef<IOrderDetail>[] = [
  {
    accessorKey: 'productId',
    header: 'Product',
    cell: ({ row, table }) => {
      const productId = row.original.productId;
      const product = table?.options?.meta?.dataProducts?.find(
        (product) => product.productId === productId,
      );
      return (
        <BasicLink href={`/products/${productId}`} className="justify-start">
          {product ? (
            product.productName
          ) : (
            <span className="flex items-center gap-2">
              {productId}
              <Spinner />
            </span>
          )}
        </BasicLink>
      );
    },
  },
  {
    accessorKey: 'unitPrice',
    header: 'Unit Price',
    cell: ({ row }) => '$' + row.original.unitPrice,
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
  },
  {
    accessorKey: 'discount',
    header: 'Discount',
    cell: ({ row }) => {
      const discount = row.original.discount;
      return discount ? discount * 100 + '%' : '-';
    },
  },
  {
    header: 'Cost',
    cell: ({ row }) => {
      return '$' + roundMoney(getTotalCost(row.original));
    },
  },
];

interface OrderDetailsTableProps {
  data: IOrderDetails;
  dataProducts: IProducts | undefined;
}

const OrderDetailsTable: React.FC<OrderDetailsTableProps> = ({
  data,
  dataProducts,
}) => {
  return <DataTable data={data} columns={allColumns} meta={{ dataProducts }} />;
};

export default OrderDetailsTable;
