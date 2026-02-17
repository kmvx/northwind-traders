import React, { memo } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import type { IEmployees } from '@/models';
import { useQueryEmployees } from '@/net';
import { BasicLink, Pagination, ResponsiveGrid, ResponsiveItems } from '@/ui';
import { formatCurrency } from '@/utils';

import { CustomerHoverCard } from '../customers';
import { EmployeeHoverCard } from '../employees';
import { ContactAddress } from '../shared';
import { type IOrderFormatted, useShipAddress } from '.';

interface OrdersCardsProps {
  data: IOrderFormatted[];
  extraNodesBefore?: React.ReactNode;
}

const OrdersCards: React.FC<OrdersCardsProps> = ({
  data,
  extraNodesBefore,
}) => {
  const { data: dataEmployees } = useQueryEmployees();

  return (
    <Pagination
      suffix="Orders"
      data={data}
      extraNodesBefore={extraNodesBefore}
      renderPage={(items) => (
        <ResponsiveGrid minWidth="15rem">
          {items.map((item) => (
            <OrderCard
              item={item}
              key={item.orderId}
              dataEmployees={dataEmployees}
            />
          ))}
        </ResponsiveGrid>
      )}
    />
  );
};

interface OrderCardProps {
  item: IOrderFormatted;
  dataEmployees: IEmployees | undefined;
}

const OrderCard: React.FC<OrderCardProps> = memo(function OrderCard({
  item,
  dataEmployees,
}) {
  const employee = dataEmployees?.find(
    (value) => value.employeeId === item.employeeId,
  );

  const address = useShipAddress(item);

  const items = [
    {
      name: 'Customer',
      value: <CustomerHoverCard customerId={item.customerId} />,
    },
    {
      name: 'Employee',
      value: (
        <EmployeeHoverCard employee={employee} employeeId={item.employeeId} />
      ),
    },
    { name: 'Order date', value: item.orderDateFormatted },
    { name: 'Shipped date', value: item.shippedDateFormatted },
    { name: 'Required date', value: item.requiredDateFormatted },
    { name: 'Freight', value: formatCurrency(item.freight) },
    {
      name: 'Ship address',
      value: (
        <ContactAddress
          address={address}
          title="Ship address"
          className="font-normal"
        />
      ),
    },
  ];

  return (
    <Card className="h-full rounded-md shadow-none">
      <CardHeader>
        <CardTitle>
          <BasicLink
            href={`/orders/${item.orderId}`}
            className="text-xl font-bold"
          >
            Order #{item.orderId}
          </BasicLink>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveItems items={items} />
      </CardContent>
    </Card>
  );
});

export default OrdersCards;
