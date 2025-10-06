import { Metadata } from 'next';

import { Employees } from '@/components/entities';
import { getEmployees } from '@/net';

export const metadata: Metadata = {
  title: 'Employees \u2014 Northwind Traders',
};

export default async function EmployeesPage() {
  return <Employees initialData={await getEmployees()} />;
}
