import { type Metadata } from 'next';

import { Suppliers } from '@/components/entities';
import { buildTitle } from '@/utils';

export const metadata: Metadata = {
  title: buildTitle('Suppliers'),
};

export default async function SuppliersPage() {
  return <Suppliers />;
}
