import { type Metadata } from 'next';

import { getProduct } from '@/db/actions';
import { Product } from '@/entities/products';
import { buildTitle } from '@/utils';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    const product = await getProduct({ productId: +id });
    return { title: buildTitle(product.productName, 'Product') };
  } catch {
    return { title: buildTitle('Product') };
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <Product productId={+id} />;
}
