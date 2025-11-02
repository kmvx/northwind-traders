'use client';

import type { ColumnDef, RowData } from '@tanstack/react-table';
import { PhoneIcon } from 'lucide-react';
import React, { useMemo } from 'react';

import { Spinner } from '@/components/ui';
import { DataTable } from '@/features/table';
import type { IEmployees, IShippers } from '@/models';
import { useQueryEmployees, useQueryShippers } from '@/net';
import { BasicLink } from '@/ui';

import { CustomerHoverCard } from '../customers';
import { EmployeeHoverCard } from '../employees';
import { Flag } from '../shared';
import type { IOrderFormatted } from '.';

declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    dataEmployees?: IEmployees | undefined;
    dataShippers?: IShippers | undefined;
  }
}

const allColumns: ColumnDef<IOrderFormatted>[] = [
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
      const employee = table?.options?.meta?.dataEmployees?.find(
        (item) => item.employeeId === employeeId,
      );
      return <EmployeeHoverCard employee={employee} employeeId={employeeId} />;
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
      return row.original.orderDateFormatted;
    },
  },
  {
    accessorKey: 'shippedDateObject',
    header: 'Shipped date',
    cell: ({ row }) => {
      return row.original.shippedDateFormatted;
    },
  },
  {
    accessorKey: 'requiredDateObject',
    header: 'Required date',
    cell: ({ row }) => {
      return row.original.requiredDateFormatted;
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

interface OrdersTableProps {
  data: IOrderFormatted[];
  isCustomerPage?: boolean;
  isEmployeePage?: boolean;
}

const OrdersTable: React.FC<OrdersTableProps> = ({
  data,
  isCustomerPage,
  isEmployeePage,
}) => {
  const { data: dataEmployees } = useQueryEmployees();
  const { data: dataShippers } = useQueryShippers();

  const columns = useMemo(() => {
    return allColumns.filter((column) => {
      if ('accessorKey' in column) {
        if (isCustomerPage && column.accessorKey === 'customerId') {
          return false;
        }
        if (isEmployeePage && column.accessorKey === 'employeeId') {
          return false;
        }
      }
      return true;
    });
  }, [isCustomerPage, isEmployeePage]);

  return (
    <DataTable
      data={data}
      columns={columns}
      meta={{ dataEmployees, dataShippers }}
    />
  );
};

export default OrdersTable;
