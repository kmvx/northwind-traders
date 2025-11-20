import { Employee } from '@/entities/employees';
import { getEmployee } from '@/net';

export default async function EmployeePage({
  params,
}: {
  params: { id: string };
}) {
  const employeeId = +(await params).id;
  const employee = await getEmployee(employeeId);
  const employeeReportsTo = employee.reportsTo
    ? await getEmployee(employee.reportsTo)
    : undefined;
  return (
    <Employee
      employeeId={employeeId}
      initialData={{ employee, employeeReportsTo }}
    />
  );
}
