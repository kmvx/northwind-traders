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

  return (
    <PanelCentred className="flex flex-col gap-4">
      <Typography.Header1>{name}</Typography.Header1>
      <div className="flex flex-col gap-4 max-w-5xl">
        <div className="text-center">
          <b>{data.title}</b>, employee
        </div>

        <div className="flex flex-col md:flex-row flex-wrap gap-2 gap-x-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2" title="Address">
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
            <Territories employeeId={id} />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2" title="Home phone">
              <PhoneIcon className="size-4 text-muted-foreground" />
              <span className="flex items-center gap-2">
                <b>{data.homePhone}</b>
                <span>Home</span>
                <CopyButton content={data.homePhone} />
              </span>
            </div>

            <div className="flex items-center gap-2">
              <CakeIcon className="size-4 text-muted-foreground" />
              <span>
                Birth date: <b>{formatDateFromString(data.birthDate)}</b>
              </span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="">
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
