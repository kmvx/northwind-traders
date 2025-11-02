'use client';

import { useQueryEmployee } from '@/net';
import { ErrorMessage, WaitSpinner } from '@/ui';

import { EmployeeHoverCard } from '.';

const EmployeeLink: React.FC<{ id: number; className?: string }> = ({
  id,
  className,
}) => {
  const hasReportsTo = Boolean(id);
  const { data, error, isLoading, refetch } = useQueryEmployee({
    employeeId: id,
    enabled: hasReportsTo,
  });

  if (error) return <ErrorMessage error={error} retry={refetch} />;
  if (isLoading) return hasReportsTo ? <WaitSpinner /> : null;
  if (!data) return <div>No data</div>;

  return (
    <span className={className}>
      <span>Reports to </span>
      <EmployeeHoverCard employee={data} employeeId={id} />
    </span>
  );
};

export default EmployeeLink;
