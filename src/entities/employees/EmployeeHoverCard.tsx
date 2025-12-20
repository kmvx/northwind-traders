'use client';

import { CakeIcon, HandshakeIcon } from 'lucide-react';
import Image from 'next/image';
import { memo, useState } from 'react';

import { Spinner } from '@/components/ui';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import type { IEmployee } from '@/models';
import { useQueryEmployee } from '@/net';
import { BasicLink, ErrorMessage, Typography, WaitSpinner } from '@/ui';
import {
  formatDateFromString,
  getEmployeeNameByData,
  joinFields,
} from '@/utils';

import { ContactAddress, ContactPhone } from '../shared';
import Territories from './Territories';

type EmployeeHoverCardProps = {
  employee: IEmployee | undefined;
  employeeId: number | null;
};

const EmployeeHoverCard: React.FC<EmployeeHoverCardProps> = ({
  employee,
  employeeId,
}) => {
  const [open, setOpen] = useState(false);
  const { data, error, isLoading, refetch } = useQueryEmployee({
    employeeId,
    enabled: open,
  });

  const getContent = () => {
    if (error) return <ErrorMessage error={error} retry={refetch} />;
    if (isLoading) return <WaitSpinner />;
    if (!data) return null;

    return (
      <div className="flex flex-col gap-2">
        <div>Employee</div>
        <div className="flex gap-4">
          <Image
            src={`/assets/img/database/${data.firstName.toLowerCase()}.jpg`}
            width={103}
            height={118}
            className="h-[118px] w-[103px] rounded-md border object-cover"
            alt=""
          />

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

        <ContactAddress
          country={data.country}
          address={joinFields(
            data.country,
            data.region,
            data.city,
            data.postalCode,
          )}
          addressDetails={data.address}
        />

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

  return (
    <HoverCard open={open} onOpenChange={setOpen}>
      <HoverCardTrigger asChild>
        <BasicLink href={`/employees/${employeeId}`}>
          {employee ? (
            getEmployeeNameByData(employee)
          ) : (
            <span className="inline-flex items-center gap-2">
              {employeeId}
              <Spinner />
            </span>
          )}
        </BasicLink>
      </HoverCardTrigger>
      <HoverCardContent className="text-sm sm:w-120">
        {getContent()}
      </HoverCardContent>
    </HoverCard>
  );
};

export default memo(EmployeeHoverCard);
