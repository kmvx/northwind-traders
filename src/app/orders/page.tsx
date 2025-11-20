import { type Metadata } from 'next';

import { Orders } from '@/entities/orders';
import { getOrders } from '@/net';
import { buildTitle } from '@/utils';

export const metadata: Metadata = {
  title: buildTitle('Orders'),
};

export default async function OrdersPage() {
  return <Orders initialData={await getOrders()} />;
}
