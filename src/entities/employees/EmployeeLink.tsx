'use client';

import { cn } from '@/lib/utils';
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
    initialData,
  });

  if (error) return <ErrorMessage error={error} retry={refetch} />;
  if (isLoading && !data) return hasReportsTo ? <WaitSpinner /> : null;
  if (!data) return <div>No data</div>;

  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span>Reports to </span>
      <EmployeeHoverCard employee={data} employeeId={employeeId} />
    </span>
  );
};

export default EmployeeLink;
