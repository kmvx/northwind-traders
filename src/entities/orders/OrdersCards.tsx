import Link from 'next/link';
import { Fragment, memo } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import type { IOrder, IOrders } from '@/models';
import { Pagination, ResponsiveGrid } from '@/ui';
import { formatDateFromString, joinFields } from '@/utils';

import { ContactAddress } from '../shared';

export default function OrdersCards({ data }: { data: IOrders }) {
  return (
    <Pagination
      data={data}
      defaultLimit={20}
      renderPage={(items) => (
        <ResponsiveGrid minWidth="22rem">
          {items.map((item) => (
            <OrderCard item={item} key={item.orderId} />
          ))}
        </ResponsiveGrid>
      )}
    />
  );
}

const OrderCard = memo(function OrderCard({ item }: { item: IOrder }) {
  const items = [
    { name: 'Order date', value: formatDateFromString(item.orderDate) },
    { name: 'Shipped date', value: formatDateFromString(item.shippedDate) },
    { name: 'Required date', value: formatDateFromString(item.requiredDate) },
    { name: 'Freight', value: '$' + item.freight },
  ];
  return (
    <Link href={`/orders/${item.orderId}`} className="block">
      <Card className="hover:shadow-lg transition h-full">
        <CardHeader>
          <CardTitle title="Ship name">Order #{item.orderId}</CardTitle>
        </CardHeader>
        <CardContent className="h-full flex flex-col justify-end gap-2 text-sm">
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
            address={joinFields(
              item.shipCountry,
              item.shipRegion,
              item.shipCity,
              item.shipAddress,
              item.shipPostalCode,
            )}
            title="Ship address"
            className="font-normal"
          />
        </CardContent>
      </Card>
    </Link>
  );
});
