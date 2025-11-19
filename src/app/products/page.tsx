import { type Metadata } from 'next';

import { Products } from '@/entities/products';
import { buildTitle } from '@/utils';

export const metadata: Metadata = {
  title: buildTitle('Products'),
};

// https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  return <Products />;
}
