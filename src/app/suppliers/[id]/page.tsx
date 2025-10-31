import { Supplier } from '@/entities/suppliers';

export default async function SupplierPage({
  params,
}: {
  params: { id: string };
}) {
  return <Supplier id={(await params).id} />;
}
