import { Employee } from '@/entities/employees';

export default async function EmployeePage({
  params,
}: {
  params: { id: string };
}) {
  return <Employee employeeId={+(await params).id} />;
}
