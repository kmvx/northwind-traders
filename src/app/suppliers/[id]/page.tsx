import { type Metadata } from 'next';

import { getSupplier } from '@/db/actions';
import { Supplier } from '@/entities/suppliers';
import { buildTitle } from '@/utils';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    const supplier = await getSupplier({ supplierId: +id });
    return { title: buildTitle(supplier.companyName, 'Supplier') };
  } catch {
    return { title: buildTitle('Supplier') };
  }
}

export default async function SupplierPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <Supplier supplierId={+id} />;
}
