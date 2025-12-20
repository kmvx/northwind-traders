import { type Metadata } from 'next';

import { getProducts } from '@/db/actions';
import { Products } from '@/entities/products';
import { buildTitle } from '@/utils';

export const metadata: Metadata = {
  title: buildTitle('Products'),
};

export default async function ProductsPage() {
  return <Products initialData={await getProducts()} />;
}
