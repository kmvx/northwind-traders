import { type Metadata } from 'next';

import { Suppliers } from '@/features/entities/suppliers';
import { buildTitle } from '@/utils';

export const metadata: Metadata = {
  title: buildTitle('Suppliers'),
};

export default async function SuppliersPage() {
  return <Suppliers />;
}
