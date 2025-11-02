import { Product } from '@/entities/products';

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  return <Product productId={+(await params).id} />;
}
