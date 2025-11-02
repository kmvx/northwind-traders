import { Customer } from '@/entities/customers';

export default async function CustomerPage({
  params,
}: {
  params: { id: string };
}) {
  return <Customer customerId={(await params).id} />;
}
