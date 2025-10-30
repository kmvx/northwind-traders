'use client';

import { CakeIcon, MapPinIcon } from 'lucide-react';
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
import { BasicLink, ContactPhone, ErrorMessage, Flag, WaitSpinner } from '@/ui';
import {
  formatDateFromString,
  getEmployeeNameByData,
  joinFields,
} from '@/utils';

import Territories from './Territories';

type EmployeeHoverCardProps = {
  employee: IEmployee | undefined;
  employeeId: number;
};

function EmployeeHoverCard({ employee, employeeId }: EmployeeHoverCardProps) {
  const [open, setOpen] = useState(false);
  const { data, error, isLoading, refetch } = useQueryEmployee({
    id: employeeId,
    enabled: open,
  });

  const getContent = () => {
    if (error) return <ErrorMessage error={error} retry={refetch} />;
    if (isLoading) return <WaitSpinner />;
    if (!data) return null;

    return (
      <div className="flex flex-col gap-2">
        <div className="flex gap-4">
          <Image
            src={`/assets/img/database/${data.firstName.toLowerCase()}.jpg`}
            width={103}
            height={118}
            className="rounded-md border object-cover w-[103px] h-[118px]"
            alt=""
          />

          <div className="flex flex-col gap-2">
            <b>{data.title}</b>

            <Territories employeeId={String(employeeId)} />
          </div>
        </div>

        <div className="flex items-center gap-2" title="Address">
          <MapPinIcon className="min-w-4 size-4 text-muted-foreground" />
          <Flag country={data.country} />
          <b>
            {joinFields(
              data.country,
              data.region,
              data.city,
              data.address,
              data.postalCode,
            )}
          </b>
        </div>

        <ContactPhone phone={data.homePhone} description="Home phone" />

        <div className="flex items-center gap-2">
          <CakeIcon className="min-w-4 size-4 text-muted-foreground" />
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
      <HoverCardContent className="sm:w-100">{getContent()}</HoverCardContent>
    </HoverCard>
  );
}

export default memo(EmployeeHoverCard);
