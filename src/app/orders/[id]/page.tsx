import { Order } from '@/entities/orders';

export default async function OrderPage({
  params,
}: {
  params: { id: string };
}) {
  return <Order orderId={(await params).id} />;
}
