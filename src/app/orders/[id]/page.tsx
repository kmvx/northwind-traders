import { Order } from '@/features/entities/orders';

export default async function OrderPage({
  params,
}: {
  params: { id: string };
}) {
  return <Order id={(await params).id} />;
}
