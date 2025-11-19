import { type Metadata } from 'next';

import { Customers } from '@/entities/customers';
import { getCustomers } from '@/net';
import { buildTitle } from '@/utils';

export const metadata: Metadata = {
  title: buildTitle('Customers'),
};

// https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
export const dynamic = 'force-dynamic';

export default async function CustomersPage() {
  return <Customers initialData={await getCustomers()} />;
}
