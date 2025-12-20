import { type Metadata } from 'next';

import { getEmployees } from '@/db/actions';
import { Employees } from '@/entities/employees';
import { buildTitle } from '@/utils';

export const metadata: Metadata = {
  title: buildTitle('Employees'),
};

export default async function EmployeesPage() {
  return <Employees initialData={await getEmployees()} />;
}
