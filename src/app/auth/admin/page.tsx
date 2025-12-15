import { type Metadata } from 'next';

import { Admin } from '@/features/admin';
import { buildTitle } from '@/utils';

export const metadata: Metadata = {
  title: buildTitle('Admin'),
};

export default async function OrdersPage() {
  return <Admin />;
}
