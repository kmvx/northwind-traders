'use client';

import {
  CakeIcon,
  FlagIcon,
  Globe2Icon,
  MapPinIcon,
  PhoneIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui';
import {
  useEmployeeTeritories,
  useQueryEmployee,
  useQueryRegions,
} from '@/net';
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
  formatYearsOldFromDateString,
  getEmployeeNameByData,
  joinFields,
  setDocumentTitle,
} from '@/utils';

import { Employees } from '.';

const Territories: React.FC<{ employeeId?: string }> = ({ employeeId }) => {
  const { data, error, isLoading, refetch } = useEmployeeTeritories({
    employeeId,
  });
  const { data: dataRegions } = useQueryRegions();

  if (error) return <ErrorMessage error={error} retry={refetch} />;
  if (isLoading) return <WaitSpinner />;
  if (!data) return <div>No data</div>;

  const regionsMap = new Map<number, string>();
  dataRegions?.forEach((region) =>
    regionsMap.set(region.regionId, region.regionDescription),
  );

  return (
    <div className="flex items-center flex-wrap my-2">
      <Globe2Icon className="size-4 text-muted-foreground me-2" />
      {data.map((item, i) => (
        <React.Fragment key={item.territoryId}>
          {i > 0 && <span>,&nbsp;</span>}
          <b
            title={`Index: ${item.territoryId}\nRegion: ${
              regionsMap.get(item.regionId) || item.regionId
            }`}
          >
            {item.territoryDescription}
          </b>
        </React.Fragment>
      ))}
    </div>
  );
};

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

        <div className="flex flex-col md:flex-row flex-wrap gap-2">
          <div>
            <div className="flex items-center gap-2" title="Address">
              <MapPinIcon className="size-4 text-muted-foreground" />
              <Flag country={data.country} />
              <b className="my-2">
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
            <div className="flex items-center gap-2 my-2" title="Home phone">
              <PhoneIcon className="size-4 text-muted-foreground" />
              <span className="flex items-center gap-2">
                <b>{data.homePhone}</b>
                <span>Home</span>
                <CopyButton content={data.homePhone} />
              </span>
            </div>

            <div className="flex items-center gap-2 my-2">
              <CakeIcon className="size-4 text-muted-foreground" />
              <span>
                Birth date: <b>{formatDateFromString(data.birthDate)}</b> (
                {formatYearsOldFromDateString(data.birthDate)})
              </span>
            </div>
          </div>
        </div>

        <div className="">
          <Image
            src={`/assets/img/database/${data.firstName.toLowerCase()}.jpg`}
            width="103"
            height="118"
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
