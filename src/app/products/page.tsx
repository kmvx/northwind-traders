import { type Metadata } from 'next';

import { Products } from '@/entities/products';
import { buildTitle } from '@/utils';

export const metadata: Metadata = {
  title: buildTitle('Products'),
};

export default async function ProductsPage() {
  return <Products />;
}
