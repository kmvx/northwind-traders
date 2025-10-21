'use client';

import { useQueryEmployee } from '@/net';
import { BasicLink, ErrorMessage, WaitSpinner } from '@/ui';
import { getEmployeeNameByData } from '@/utils';

const EmployeeLink: React.FC<{ id: number; className?: string }> = ({
  id,
  className,
}) => {
  const hasReportsTo = Boolean(id);
  const { data, error, isLoading, refetch } = useQueryEmployee({
    id,
    enabled: hasReportsTo,
  });

  if (error) return <ErrorMessage error={error} retry={refetch} />;
  if (isLoading) return hasReportsTo ? <WaitSpinner /> : null;
  if (!data) return <div>No data</div>;

  return (
    <span className={className}>
      <span>Reports to </span>
      <BasicLink href={`/employees/${id}`}>
        {getEmployeeNameByData(data)}
      </BasicLink>
    </span>
  );
};

export default EmployeeLink;
