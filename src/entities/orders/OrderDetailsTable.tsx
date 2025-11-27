import type { ColumnDef, RowData } from '@tanstack/react-table';
import React, { useMemo } from 'react';

import { Spinner } from '@/components/ui';
import { DataTable } from '@/features/table';
import type {
  ICategories,
  IOrderDetail,
  IOrderDetails,
  IProducts,
  ISuppliers,
} from '@/models';
import { BasicLink } from '@/ui';
import { formatCurrency } from '@/utils';

import { Category } from '../products';
import { SupplierPreview } from '../suppliers';
import { OrderHoverCard } from '.';
import { getTotalCost } from './utilsOrders';

declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    dataProducts?: IProducts | undefined;
    dataCategories?: ICategories | undefined;
    dataSuppliers?: ISuppliers | undefined;
  }
}

const allColumns: ColumnDef<IOrderDetail>[] = [
  {
    accessorKey: 'orderId',
    header: 'Order ID',
    cell: ({ row }) => {
      const orderId = row.original.orderId;
      return <OrderHoverCard orderId={orderId} />;
    },
  },
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
    accessorKey: 'categoryId',
    header: 'Category',
    cell: ({ row, table }) => {
      const productId = row.original.productId;
      const product = table?.options?.meta?.dataProducts?.find(
        (product) => product.productId === productId,
      );
      return (
        <Category
          dataCategories={table?.options?.meta?.dataCategories}
          categoryId={product?.categoryId}
        />
      );
    },
  },
  {
    accessorKey: 'supplierId',
    header: 'Supplier',
    cell: ({ row, table }) => {
      const productId = row.original.productId;
      const product = table?.options?.meta?.dataProducts?.find(
        (product) => product.productId === productId,
      );
      if (!product) return null;

      return (
        <SupplierPreview
          dataSuppliers={table?.options?.meta?.dataSuppliers}
          supplierId={product.supplierId}
        />
      );
    },
  },
  {
    accessorKey: 'unitPrice',
    header: 'Unit Price',
    cell: ({ row }) => formatCurrency(row.original.unitPrice),
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
      return formatCurrency(getTotalCost(row.original));
    },
  },
];

interface OrderDetailsTableProps {
  data: IOrderDetails;
  dataProducts: IProducts | undefined;
  dataCategories: ICategories | undefined;
  dataSuppliers: ISuppliers | undefined;
  showProduct: boolean;
  extraNodesAfter?: React.ReactNode;
}

const OrderDetailsTable: React.FC<OrderDetailsTableProps> = ({
  data,
  dataProducts,
  dataCategories,
  dataSuppliers,
  showProduct,
  extraNodesAfter,
}) => {
  const columns = useMemo(() => {
    return allColumns.filter((column) => {
      if ('accessorKey' in column) {
        if (showProduct && column.accessorKey === 'orderId') return false;
        if (
          !showProduct &&
          ['productId', 'categoryId'].some(
            (item) => column.accessorKey === item,
          )
        ) {
          return false;
        }
      }
      return true;
    });
  }, [showProduct]);
  return (
    <DataTable
      suffix="OrderDetails"
      data={data}
      columns={columns}
      meta={{ dataProducts, dataCategories, dataSuppliers }}
      extraNodesAfter={extraNodesAfter}
    />
  );
};

export default OrderDetailsTable;
