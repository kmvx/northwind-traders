import { Employee } from '@/components/entities';

export default async function EmployeePage({
  params,
}: {
  params: { id: string };
}) {
  return <Employee id={(await params).id} />;
}
