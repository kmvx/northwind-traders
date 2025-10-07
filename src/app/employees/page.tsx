import { type Metadata } from 'next';

import { Employees } from '@/components/entities';
import { getEmployees } from '@/net';
import { buildTitle } from '@/utils';

export const metadata: Metadata = {
  title: buildTitle('Employees'),
};

export default async function EmployeesPage() {
  return <Employees initialData={await getEmployees()} />;
}
