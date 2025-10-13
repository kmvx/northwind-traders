import { Employee } from '@/features/entities/employees';

export default async function EmployeePage({
  params,
}: {
  params: { id: string };
}) {
  return <Employee id={(await params).id} />;
}
