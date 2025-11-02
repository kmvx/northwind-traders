import Link from 'next/link';
import React, { Fragment, memo } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Pagination, ResponsiveGrid } from '@/ui';

import { ContactAddress } from '../shared';
import type { IOrderFormatted } from '.';

interface OrdersCardsProps {
  data: IOrderFormatted[];
}

const OrdersCards: React.FC<OrdersCardsProps> = ({ data }) => {
  return (
    <Pagination
      data={data}
      defaultLimit={20}
      renderPage={(items) => (
        <ResponsiveGrid minWidth="15rem">
          {items.map((item) => (
            <OrderCard item={item} key={item.orderId} />
          ))}
        </ResponsiveGrid>
      )}
    />
  );
};

interface OrderCardProps {
  item: IOrderFormatted;
}

const OrderCard: React.FC<OrderCardProps> = memo(function OrderCard({ item }) {
  const items = [
    { name: 'Order date', value: item.orderDateFormatted },
    { name: 'Shipped date', value: item.shippedDateFormatted },
    { name: 'Required date', value: item.requiredDateFormatted },
    { name: 'Freight', value: '$' + item.freight },
  ];
  return (
    <Link href={`/orders/${item.orderId}`} className="block">
      <Card className="hover:shadow-lg transition h-full">
        <CardHeader>
          <CardTitle title="Ship name">Order #{item.orderId}</CardTitle>
        </CardHeader>
        <CardContent className="h-full flex flex-col justify-end gap-4 text-sm">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {items.map((item) => (
              <Fragment key={item.name}>
                <div className="text-muted-foreground">{item.name}</div>
                <div className="text-end">{item.value}</div>
              </Fragment>
            ))}
          </div>
          <ContactAddress
            country={item.shipCountry}
            address={item.addressLine}
            title="Ship address"
            className="font-normal"
          />
        </CardContent>
      </Card>
    </Link>
  );
});

export default OrdersCards;
