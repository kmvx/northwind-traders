import { type ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { Button } from '@/components/ui';
import { DataTable } from '@/features/table';
import type { IProduct, IProducts } from '@/models';

const columns: ColumnDef<IProduct>[] = [
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
        <Button variant="link" asChild className="p-0 text-blue-600 h-auto">
          <Link href={`/products/${productId}`}>{productName}</Link>
        </Button>
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
    cell: ({ getValue }) => {
      return '$' + getValue<string>();
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
    cell: ({ getValue }) => {
      return getValue<boolean>() ? 'Discontinued' : 'Active';
    },
  },
];

export default function ProductsTable({ data }: { data: IProducts }) {
  return <DataTable data={data} columns={columns} />;
}
