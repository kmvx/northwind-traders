import { Customer } from '@/features/entities/customers';

export default async function CustomerPage({
  params,
}: {
  params: { id: string };
}) {
  return <Customer id={(await params).id} />;
}
