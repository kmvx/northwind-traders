import { type Metadata } from 'next';

import { getOrders } from '@/db/actions';
import { Orders } from '@/entities/orders';
import { buildTitle } from '@/utils';

export const metadata: Metadata = {
  title: buildTitle('Orders'),
};

export default async function OrdersPage() {
  return <Orders initialData={await getOrders()} />;
}
