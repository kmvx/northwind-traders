import { Metadata } from 'next';

import { Employees } from '@/components/entities';

export const metadata: Metadata = {
  title: 'Employees \u2014 Northwind Traders',
};

export default function EmployeesPage() {
  return <Employees />;
}
