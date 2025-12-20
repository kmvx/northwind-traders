import { type Metadata } from 'next';

import { getSuppliers } from '@/db/actions';
import { Suppliers } from '@/entities/suppliers';
import { buildTitle } from '@/utils';

export const metadata: Metadata = {
  title: buildTitle('Suppliers'),
};

export default async function SuppliersPage() {
  return <Suppliers initialData={await getSuppliers()} />;
}
