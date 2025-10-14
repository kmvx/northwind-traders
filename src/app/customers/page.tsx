import { type Metadata } from 'next';

import { Customers } from '@/features/entities/customers';
import { buildTitle } from '@/utils';

export const metadata: Metadata = {
  title: buildTitle('Customers'),
};

export default async function CustomersPage() {
  return <Customers />;
}
