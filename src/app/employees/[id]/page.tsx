import { type Metadata } from 'next';
import invariant from 'tiny-invariant';

import { getEmployee } from '@/db/actions';
import { Employee } from '@/entities/employees';
import { buildTitle, getEmployeeNameByData } from '@/utils';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    const employee = await getEmployee({ employeeId: +id });
    invariant(employee);
    return {
      title: buildTitle(getEmployeeNameByData(employee), 'Employee'),
    };
  } catch {
    return { title: buildTitle('Employee') };
  }
}

export default async function EmployeePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const employeeId = +id;
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
