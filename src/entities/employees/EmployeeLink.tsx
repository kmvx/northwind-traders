'use client';

import type { IEmployee } from '@/models';
import { useQueryEmployee } from '@/net';
import { ErrorMessage, WaitSpinner } from '@/ui';

import { EmployeeHoverCard } from '.';

interface EmployeeLinkProps {
  employeeId: number;
  className?: string;
  initialData?: IEmployee | undefined;
}

const EmployeeLink: React.FC<EmployeeLinkProps> = ({
  employeeId,
  className,
  initialData,
}) => {
  const hasReportsTo = Boolean(employeeId);
  const { data, error, isLoading, refetch } = useQueryEmployee({
    employeeId,
    enabled: hasReportsTo,
  });

  const employee = data ?? initialData;

  if (error) return <ErrorMessage error={error} retry={refetch} />;
  if (isLoading && !employee) return hasReportsTo ? <WaitSpinner /> : null;
  if (!employee) return <div>No data</div>;

  return (
    <span className={className}>
      <span>Reports to </span>
      <EmployeeHoverCard employee={employee} employeeId={employeeId} />
    </span>
  );
};

export default EmployeeLink;
