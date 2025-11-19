import { Employee } from '@/entities/employees';
import { getEmployee } from '@/net';

export default async function EmployeePage({
  params,
}: {
  params: { id: string };
}) {
  const employeeId = +(await params).id;
  return (
    <Employee
      employeeId={employeeId}
      initialData={await getEmployee(employeeId)}
    />
  );
}
