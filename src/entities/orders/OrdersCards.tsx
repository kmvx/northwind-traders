import React, { memo } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import type { IEmployees } from '@/models';
import { useQueryEmployees } from '@/net';
import { BasicLink, Pagination, ResponsiveGrid, ResponsiveItems } from '@/ui';
import { formatCurrency } from '@/utils';

import { CustomerHoverCard } from '../customers';
import { EmployeeHoverCard } from '../employees';
import { ContactAddress } from '../shared';
import { type IOrderFormatted } from '.';

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

  const items = [
    { name: 'Order date', value: item.orderDateFormatted },
    { name: 'Shipped date', value: item.shippedDateFormatted },
    { name: 'Required date', value: item.requiredDateFormatted },
    { name: 'Freight', value: formatCurrency(item.freight) },
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
      <CardContent className="flex h-full flex-col justify-end gap-4 text-sm">
        <div className="flex flex-wrap justify-between gap-2">
          <CustomerHoverCard customerId={item.customerId} />
          <EmployeeHoverCard employee={employee} employeeId={item.employeeId} />
        </div>
        <ResponsiveItems items={items} />
        <ContactAddress
          country={item.shipCountry}
          address={item.shipLocation}
          addressDetails={item.shipAddress}
          title="Ship address"
          className="font-normal"
        />
      </CardContent>
    </Card>
  );
});

export default OrdersCards;
