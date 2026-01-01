import { Customer } from '@/entities/customers';
import { asCustomerIdType } from '@/types';

export default async function CustomerPage({
  params,
}: {
  params: { id: string };
}) {
  return <Customer customerId={asCustomerIdType((await params).id)} />;
}
