'use client';

import Link from 'next/link';

import { Button } from '@/components/ui';
import { useQueryEmployee } from '@/net';
import { ErrorMessage, WaitSpinner } from '@/ui';
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
      <Button variant="link" asChild className="p-0 text-blue-600">
        <Link href={`/employees/${id}`}>{getEmployeeNameByData(data)}</Link>
      </Button>
    </span>
  );
};

export default EmployeeLink;
