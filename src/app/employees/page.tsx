import { type Metadata } from 'next';

import { Employees } from '@/entities/employees';
import { getEmployees } from '@/net';
import { buildTitle } from '@/utils';

export const metadata: Metadata = {
  title: buildTitle('Employees'),
};

// https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
export const dynamic = 'force-dynamic';

export default async function EmployeesPage() {
  return <Employees initialData={await getEmployees()} />;
}
