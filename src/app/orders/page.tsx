import { type Metadata } from 'next';

import { Orders } from '@/entities/orders';
import { buildTitle } from '@/utils';

export const metadata: Metadata = {
  title: buildTitle('Orders'),
};

// https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
export const dynamic = 'force-dynamic';

export default async function OrdersPage() {
  return <Orders />;
}
