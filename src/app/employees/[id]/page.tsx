import { getEmployee } from '@/db/actions';
import { Employee } from '@/entities/employees';

export default async function EmployeePage({
  params,
}: {
  params: { id: string };
}) {
  const employeeId = +(await params).id;
  const employee = await getEmployee({ employeeId });
  if (!employee) return;

  const employeeReportsTo = employee.reportsTo
    ? await getEmployee({ employeeId: employee.reportsTo })
    : undefined;

  return (
    <Employee
      employeeId={employeeId}
      initialData={{ employee, employeeReportsTo }}
    />
  );
}
