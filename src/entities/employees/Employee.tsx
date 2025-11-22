'use client';

import { CakeIcon, FlagIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { Separator } from '@/components/ui';
import type { IEmployee } from '@/models';
import { useQueryEmployee } from '@/net';
import {
  ErrorMessage,
  PanelCentred,
  PropertyGrid,
  Typography,
  WaitSpinner,
} from '@/ui';
import {
  formatDateFromString,
  getEmployeeNameByData,
  joinFields,
  setDocumentTitle,
} from '@/utils';

import { Orders } from '../orders';
import { ContactAddress, ContactPhone } from '../shared';
import { EmployeeLink, Employees, Territories } from '.';

interface EmployeeProps {
  employeeId: number;
  initialData?: {
    employee: IEmployee;
    employeeReportsTo: IEmployee | undefined;
  };
}

const Employee: React.FC<EmployeeProps> = ({ employeeId, initialData }) => {
  const { data, error, isLoading, refetch } = useQueryEmployee({
    employeeId,
    initialData: initialData?.employee,
  });

  const name = data ? getEmployeeNameByData(data) : undefined;
  setDocumentTitle(name, 'Employee');

  if (error) return <ErrorMessage error={error} retry={refetch} />;
  if (isLoading && !data) return <WaitSpinner />;
  if (!data) return <div>No data</div>;

  const items = [
    {
      name: 'Address',
      value: (
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
      ),
      description: 'Employee’s home mailing street address.',
    },
    {
      name: 'Territories',
      value: <Territories employeeId={employeeId} />,
      description: 'Sales regions.',
    },
    {
      name: 'Home phone',
      value: <ContactPhone phone={data.homePhone} />,
      description: 'Contact phone number.',
    },
    {
      name: 'Birth date',
      value: (
        <div className="flex items-center gap-2">
          <CakeIcon className="size-4 text-muted-foreground" />
          <span className="flex items-center gap-2">
            <b>{formatDateFromString(data.birthDate)}</b>
          </span>
        </div>
      ),
      description: 'The specific day, month, and year the employee was born.',
    },
  ];

  return (
    <PanelCentred className="flex flex-col gap-4">
      <Typography.Header1>{name}</Typography.Header1>
      <div className="flex flex-col gap-4">
        <div className="text-center">
          <b>{data.title}</b>, employee
        </div>

        <PropertyGrid items={items} />

        <Separator />

        <div>
          <Image
            src={`/assets/img/database/${data.firstName.toLowerCase()}.jpg`}
            width={103}
            height={118}
            className="rounded-md border float-left mr-2"
            alt=""
          />
          <div>{data.notes}</div>
        </div>

        {data.reportsTo && (
          <div className="flex items-center gap-2">
            <FlagIcon className="size-4 text-muted-foreground" />
            <EmployeeLink
              employeeId={data.reportsTo}
              initialData={initialData?.employeeReportsTo}
            />
          </div>
        )}
      </div>

      <div>
        <Employees reportsTo={employeeId} />
      </div>
      <Orders employeeId={employeeId} />
    </PanelCentred>
  );
};

export default Employee;
