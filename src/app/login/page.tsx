import { type Metadata } from 'next';

import { Login } from '@/features/auth';
import { buildTitle } from '@/utils';

export const metadata: Metadata = {
  title: buildTitle('Login'),
};

export default async function OrdersPage() {
  return <Login />;
}
