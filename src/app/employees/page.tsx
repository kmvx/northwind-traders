'use client';

import { useQueryEmployees } from '@/net';

export default function EmployeesPage() {
  const { data } = useQueryEmployees();

  return <div>Employees {JSON.stringify(data)}</div>;
}
