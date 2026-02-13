'use client';

import { CakeIcon, HandshakeIcon } from 'lucide-react';
import { memo } from 'react';

import { Spinner } from '@/components/ui';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import type { IEmployee } from '@/models';
import { useQueryEmployeeFromAll } from '@/net';
import { BasicLink, ErrorMessage, Typography, WaitSpinner } from '@/ui';
import { formatDateFromString, getEmployeeNameByData } from '@/utils';

import { ContactAddress, ContactPhone, Flag } from '../shared';
import { EmployeePhoto, Territories } from '.';

interface EmployeeHoverCardProps {
  employee:
    | Pick<IEmployee, 'titleOfCourtesy' | 'firstName' | 'lastName' | 'country'>
    | Pick<IEmployee, 'titleOfCourtesy' | 'firstName' | 'lastName'>
    | undefined;
  employeeId: number | null;
}

const EmployeeHoverCard: React.FC<EmployeeHoverCardProps> = ({
  employee,
  employeeId,
}) => {
  const { data, error, isLoading, refetch } = useQueryEmployeeFromAll({
    employeeId,
  });

  const getContent = () => {
    if (error) return <ErrorMessage error={error} retry={refetch} />;
    if (isLoading) return <WaitSpinner />;
    if (!data) return null;

    return (
      <div className="flex flex-col gap-2">
        <div>Employee</div>
        <div className="flex gap-4">
          <EmployeePhoto firstName={data.firstName} />

          <div className="flex flex-col gap-2">
            <Typography.Header2>
              {getEmployeeNameByData(data)}
            </Typography.Header2>
            <Typography.Header3>{data.title}</Typography.Header3>

            <Territories employeeId={employeeId} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="u-hue-violet rounded-md p-2">
            <HandshakeIcon className="size-4 min-w-4" />
          </div>
          <span>
            Hire date: <b>{formatDateFromString(data.hireDate)}</b>
          </span>
        </div>

        <ContactPhone phone={data.extension} description="Phone extension" />

        <ContactAddress address={data} />

        <ContactPhone phone={data.homePhone} description="Home phone" />

        <div className="flex items-center gap-2">
          <div className="u-hue-blue rounded-md p-2">
            <CakeIcon className="size-4 min-w-4" />
          </div>
          <span>
            Birth date: <b>{formatDateFromString(data.birthDate)}</b>
          </span>
        </div>
      </div>
    );
  };

  const href = `/employees/${employeeId}`;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        {employee ? (
          <span className="inline-flex items-center gap-2">
            <EmployeePhoto firstName={employee.firstName} sizeRem={2.5} />
            {'country' in employee && <Flag country={employee.country} />}
            <BasicLink href={href}>{getEmployeeNameByData(employee)}</BasicLink>
          </span>
        ) : (
          <span className="inline-flex items-center gap-2">
            <BasicLink href={href}>{employeeId}</BasicLink>
            <Spinner />
          </span>
        )}
      </HoverCardTrigger>
      <HoverCardContent className="text-sm sm:w-120">
        {getContent()}
      </HoverCardContent>
    </HoverCard>
  );
};

export default memo(EmployeeHoverCard);
