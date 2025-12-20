import { type Metadata } from 'next';

import { getCustomers } from '@/db/actions';
import { Customers } from '@/entities/customers';
import { buildTitle } from '@/utils';

export const metadata: Metadata = {
  title: buildTitle('Customers'),
};

export default async function CustomersPage() {
  return <Customers initialData={await getCustomers()} />;
}
