'use client';

import { useQueryEmployee } from '@/net';
import { ErrorMessage, WaitSpinner } from '@/ui';

import { EmployeeHoverCard } from '.';

interface EmployeeLinkProps {
  employeeId: number;
  className?: string;
}

const EmployeeLink: React.FC<EmployeeLinkProps> = ({
  employeeId,
  className,
}) => {
  const hasReportsTo = Boolean(employeeId);
  const { data, error, isLoading, refetch } = useQueryEmployee({
    employeeId,
    enabled: hasReportsTo,
  });

  if (error) return <ErrorMessage error={error} retry={refetch} />;
  if (isLoading) return hasReportsTo ? <WaitSpinner /> : null;
  if (!data) return <div>No data</div>;

  return (
    <span className={className}>
      <span>Reports to </span>
      <EmployeeHoverCard employee={data} employeeId={employeeId} />
    </span>
  );
};

export default EmployeeLink;
