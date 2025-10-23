import type { ColumnDef, RowData } from '@tanstack/react-table';
import { PhoneIcon } from 'lucide-react';
import { useMemo } from 'react';

import { Spinner } from '@/components/ui';
import { DataTable } from '@/features/table';
import type { IEmployees, IOrder, IOrders, IShippers } from '@/models';
import { useQueryEmployees, useQueryShippers } from '@/net';
import { BasicLink, Flag } from '@/ui';
import {
  dateFromString,
  formatDateFromString,
  getEmployeeNameByData,
  joinFields,
} from '@/utils';

import { CustomerHoverCard } from '../customers';

declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    dataEmployees?: IEmployees | undefined;
    dataShippers?: IShippers | undefined;
  }
}

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
      return <BasicLink href={`/orders/${orderId}`}>{orderId}</BasicLink>;
    },
  },
  {
    accessorKey: 'customerId',
    header: 'Customer ID',
    cell: ({ row }) => {
      const customerId = row.original.customerId;
      return <CustomerHoverCard customerId={customerId} />;
    },
  },
  {
    accessorKey: 'employeeId',
    header: 'Employee',
    cell: ({ row, table }) => {
      const employeeId = row.original.employeeId;
      const item = table?.options?.meta?.dataEmployees?.find(
        (item) => item.employeeId === employeeId,
      );

      return (
        <BasicLink href={`/employees/${employeeId}`}>
          {item ? (
            getEmployeeNameByData(item)
          ) : (
            <span className="inline-flex items-center gap-2">
              {employeeId}
              <Spinner />
            </span>
          )}
        </BasicLink>
      );
    },
  },
  {
    accessorKey: 'shipVia',
    header: 'Shipper',
    cell: ({ row, table }) => {
      const shipVia = row.original.shipVia;
      const shipper = table?.options?.meta?.dataShippers?.find(
        (item) => item.shipperId === shipVia,
      );

      if (!shipper) {
        return (
          <span className="inline-flex items-center gap-2">
            {shipVia}
            <Spinner />
          </span>
        );
      }

      return (
        <div className="flex flex-col gap-1">
          <div>{shipper.companyName}</div>
          <div
            className="text-xs text-muted-foreground flex items-center gap-1 ms-2"
            title="Phone"
          >
            <PhoneIcon className="size-2" />
            <span>{shipper.phone}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'orderDateObject',
    header: 'Order date',
    cell: ({ row }) => {
      return formatDateFromString(row.original.orderDate);
    },
  },
  {
    accessorKey: 'shippedDateObject',
    header: 'Shipped date',
    cell: ({ row }) => {
      return formatDateFromString(row.original.shippedDate);
    },
  },
  {
    accessorKey: 'requiredDateObject',
    header: 'Required date',
    cell: ({ row }) => {
      return formatDateFromString(row.original.requiredDate);
    },
  },
  {
    accessorKey: 'freight',
    header: 'Freight',
    cell: ({ row }) => {
      return '$' + row.original.freight;
    },
  },
  {
    accessorKey: 'shipName',
    header: 'Ship name',
  },
  {
    accessorKey: 'addressLine',
    header: 'Ship address',
    cell: ({ row }) => {
      return (
        <span className="inline-flex items-center gap-2">
          <Flag country={row.original.shipCountry} />
          <span>{row.original.addressLine}</span>
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

  const { data: dataEmployees } = useQueryEmployees();
  const { data: dataShippers } = useQueryShippers();

  return (
    <DataTable
      data={dataFormatted}
      columns={columns}
      meta={{ dataEmployees, dataShippers }}
    />
  );
}
