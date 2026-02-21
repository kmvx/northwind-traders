import { type Metadata } from 'next';

import { getCustomer } from '@/db/actions';
import { Customer } from '@/entities/customers';
import { asCustomerIdType } from '@/types';
import { buildTitle } from '@/utils';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    const customer = await getCustomer({ customerId: asCustomerIdType(id) });
    return { title: buildTitle(customer?.companyName, 'Customer') };
  } catch {
    return { title: buildTitle('Customer') };
  }
}

export default async function CustomerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <Customer customerId={asCustomerIdType(id)} />;
}
