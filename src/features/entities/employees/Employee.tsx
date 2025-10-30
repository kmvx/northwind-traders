'use client';

import { CakeIcon, FlagIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { Separator } from '@/components/ui';
import { useQueryEmployee } from '@/net';
import {
  CopyButton,
  ErrorMessage,
  Flag,
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

import { EmployeeLink, Employees, Territories } from '.';

interface EmployeeProps {
  id: string;
}

const Employee: React.FC<EmployeeProps> = ({ id }) => {
  const { data, error, isLoading, refetch } = useQueryEmployee({ id });

  const name = data ? getEmployeeNameByData(data) : undefined;
  setDocumentTitle(name, 'Employee');

  if (error) return <ErrorMessage error={error} retry={refetch} />;
  if (isLoading) return <WaitSpinner />;
  if (!data) return <div>No data</div>;

  const items = [
    {
      name: 'Address',
      value: (
        <div className="inline-flex items-center gap-2">
          <MapPinIcon className="size-4 text-muted-foreground" />
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
      ),
      description: 'Employee’s home mailing street address.',
    },
    {
      name: 'Territories',
      value: <Territories employeeId={id} />,
      description: 'Sales regions.',
    },
    {
      name: 'Home phone',
      value: (
        <div className="flex items-center gap-2">
          <PhoneIcon className="size-4 text-muted-foreground" />
          <span className="flex items-center gap-2">
            <b>{data.homePhone}</b>
            <CopyButton content={data.homePhone} />
          </span>
        </div>
      ),
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
            <EmployeeLink id={data.reportsTo} />
          </div>
        )}
      </div>

      <div>
        <Employees reportsTo={id} />
      </div>
    </PanelCentred>
  );
};

export default Employee;
