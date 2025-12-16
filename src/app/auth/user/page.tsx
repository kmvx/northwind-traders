import { type Metadata } from 'next';

import { UserCurrent } from '@/features/auth';
import { buildTitle } from '@/utils';

export const metadata: Metadata = {
  title: buildTitle('User'),
};

export default async function OrdersPage() {
  return <UserCurrent />;
}
