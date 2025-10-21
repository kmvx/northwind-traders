import type { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { useMemo } from 'react';

import { Button } from '@/components/ui';
import { DataTable } from '@/features/table';
import type { IOrder, IOrders } from '@/models';
import { dateFromString, formatDateFromString, joinFields } from '@/utils';
import { Flag } from '@/ui';

interface OrderFormatted extends IOrder {
  orderDateObject: Date;
  shippedDateObject: Date;
  requiredDateObject: Date;
  addressLine: string;
}

const columns: ColumnDef<OrderFormatted>[] = [
  {
    accessorKey: 'orderId',
    header: '#',
    cell: ({ row }) => {
      const orderId = row.original.orderId;
      return (
        <Button variant="link" asChild className="p-0 text-blue-600 h-auto">
          <Link href={`/orders/${orderId}`}>{orderId}</Link>
        </Button>
      );
    },
  },
  {
    accessorKey: 'orderDateObject',
    header: 'Order date',
    cell: ({ getValue }) => {
      return formatDateFromString(getValue<Date>().toISOString());
    },
  },
  {
    accessorKey: 'shippedDateObject',
    header: 'Shipped date',
    cell: ({ getValue }) => {
      return formatDateFromString(getValue<Date>().toISOString());
    },
  },
  {
    accessorKey: 'requiredDateObject',
    header: 'Required date',
    cell: ({ getValue }) => {
      return formatDateFromString(getValue<Date>().toISOString());
    },
  },
  {
    accessorKey: 'freight',
    header: 'Freight',
  },
  {
    accessorKey: 'shipName',
    header: 'Ship name',
  },
  {
    accessorKey: 'addressLine',
    header: 'Ship address',
    cell: ({ row, getValue }) => {
      return (
        <span className="inline-flex items-center gap-2">
          <Flag country={row.original.shipCountry} />{getValue<string>()}
        </span>
      );
    },
  },
];

export default function OrdersTable({ data }: { data: IOrders }) {
  const dataFormatted: OrderFormatted[] = useMemo(() => {
    return data.map((item) => ({
      ...item,
      orderDateObject: dateFromString(item.orderDate),
      shippedDateObject: dateFromString(item.shippedDate),
      requiredDateObject: dateFromString(item.requiredDate),
      addressLine: joinFields(
        item.shipCountry,
        item.shipRegion,
        item.shipCity,
        item.shipAddress,
        item.shipPostalCode,
      ),
    }));
  }, [data]);

  return <DataTable data={dataFormatted} columns={columns} />;
}
