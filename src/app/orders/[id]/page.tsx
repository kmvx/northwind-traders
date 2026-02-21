import { type Metadata } from 'next';

import { getOrder } from '@/db/actions';
import { Order } from '@/entities/orders';
import { buildTitle } from '@/utils';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    const order = await getOrder({ orderId: +id });
    return { title: buildTitle(`Order #${order.orderId}`) };
  } catch {
    return { title: buildTitle('Order') };
  }
}

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <Order orderId={+id} />;
}
