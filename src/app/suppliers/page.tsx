import { type Metadata } from 'next';

import { Suppliers } from '@/entities/suppliers';
import { buildTitle } from '@/utils';

export const metadata: Metadata = {
  title: buildTitle('Suppliers'),
};

// https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
export const dynamic = 'force-dynamic';

export default async function SuppliersPage() {
  return <Suppliers />;
}
