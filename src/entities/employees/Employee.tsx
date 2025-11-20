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
  const { data, error, isLoading, refetch } = useQueryEmployee({ employeeId });

  const employee = data ?? initialData?.employee;

  const name = employee ? getEmployeeNameByData(employee) : undefined;
  setDocumentTitle(name, 'Employee');

  if (error) return <ErrorMessage error={error} retry={refetch} />;
  if (isLoading && !employee) return <WaitSpinner />;
  if (!employee) return <div>No data</div>;

  const items = [
    {
      name: 'Address',
      value: (
        <ContactAddress
          country={employee.country}
          address={joinFields(
            employee.country,
            employee.region,
            employee.city,
            employee.postalCode,
            employee.address,
          )}
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
      value: <ContactPhone phone={employee.homePhone} />,
      description: 'Contact phone number.',
    },
    {
      name: 'Birth date',
      value: (
        <div className="flex items-center gap-2">
          <CakeIcon className="size-4 text-muted-foreground" />
          <span className="flex items-center gap-2">
            <b>{formatDateFromString(employee.birthDate)}</b>
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
          <b>{employee.title}</b>, employee
        </div>

        <PropertyGrid items={items} />

        <Separator />

        <div>
          <Image
            src={`/assets/img/database/${employee.firstName.toLowerCase()}.jpg`}
            width={103}
            height={118}
            className="rounded-md border float-left mr-2"
            alt=""
          />
          <div>{employee.notes}</div>
        </div>

        {employee.reportsTo && (
          <div className="flex items-center gap-2">
            <FlagIcon className="size-4 text-muted-foreground" />
            <EmployeeLink
              employeeId={employee.reportsTo}
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
