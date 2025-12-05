'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Separator,
  Skeleton,
} from '@/components/ui';
import { EmployeesBarChart } from '@/features/charts';
import { useFiltersToggle, useQueryStateFixed } from '@/hooks';
import { type IEmployees } from '@/models';
import { useQueryEmployees } from '@/net';
import {
  ErrorMessage,
  ExportDropdown,
  FiltersClearButton,
  PanelStretched,
  ReloadButton,
  ResponsiveGrid,
  Typography,
} from '@/ui';
import { getEmployeeNameByData, isStringIncludes } from '@/utils';

import { FilterCountry, Location, LocationSkeleton } from '../shared';

interface EmployeesProps {
  initialData?: IEmployees;
  reportsTo?: number;
}

const Employees: React.FC<EmployeesProps> = ({ initialData, reportsTo }) => {
  // Filters
  const { showFilters, getFiltersToggleButton } = useFiltersToggle();
  const [filterString, setFilterString] = useQueryStateFixed('q', {
    defaultValue: '',
  });
  const [filterCountry, setFilterCountry] = useQueryStateFixed('country', {
    defaultValue: '',
  });
  const hasFilters = !!filterString || !!filterCountry;
  function handleFiltersClear() {
    setFilterString('');
    setFilterCountry('');
  }

  // Network data
  const { data, error, isLoading, isFetching, refetch } = useQueryEmployees({
    initialData,
  });

  // Filter data
  const filteredData = useMemo(() => {
    let filteredData = data;
    if (reportsTo) {
      filteredData = filteredData?.filter(
        (item) => item.reportsTo == reportsTo,
      );
    }
    if (filterString) {
      filteredData = filteredData?.filter((item) =>
        (['title', 'country', 'city'] as const).some((name) => {
          if (isStringIncludes(getEmployeeNameByData(item), filterString))
            return true;
          return isStringIncludes(item[name], filterString);
        }),
      );
    }
    if (filterCountry) {
      filteredData = filteredData?.filter(
        (item) => item.country === filterCountry,
      );
    }
    return filteredData;
  }, [data, filterString, filterCountry, reportsTo]);

  const getContent = () => {
    if (error) return <ErrorMessage error={error} retry={refetch} />;
    if (isLoading && filteredData?.length === 0) return <LocalSkeleton />;
    if (!filteredData) return null;

    return (
      <ResponsiveGrid minWidth="18rem">
        {filteredData.map((item, index) => (
          <Link
            href={`/employees/${item.employeeId}`}
            key={item.employeeId}
            className="block"
          >
            <Card className="h-full rounded-md shadow-none transition hover:shadow-lg">
              <CardHeader>
                <CardTitle title="Employee name">
                  {getEmployeeNameByData(item)}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Image
                  src={`/assets/img/database/${item.firstName.toLowerCase()}.jpg`}
                  alt=""
                  title="Employee photo"
                  className="h-[70px] w-[70px] rounded-md object-cover"
                  width="70"
                  height="70"
                  priority={index === 0}
                />
                <div className="flex flex-1 flex-col justify-between">
                  <span
                    className="text-right text-sm font-medium"
                    title="Employee title"
                  >
                    {item.title}
                  </span>
                  <Location
                    country={item.country}
                    city={item.city}
                    title="Employee location"
                  />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </ResponsiveGrid>
    );
  };

  if (reportsTo && !filteredData?.length && !hasFilters) {
    return null;
  }

  return (
    <PanelStretched className="flex flex-col gap-4">
      <Typography variant={reportsTo ? 'header2' : 'header1'}>
        {reportsTo ? 'Direct subordinates' : 'Employees'}
      </Typography>
      {showFilters && (
        <div className="flex flex-wrap items-center gap-2">
          {getFiltersToggleButton()}
          <div className="flex-grow">
            <Input
              type="search"
              placeholder="Enter filter string here"
              value={filterString}
              onChange={(event) => setFilterString(event.target.value)}
              title="String filter"
            />
          </div>
          <FilterCountry
            filterCountry={filterCountry}
            setFilterCountry={setFilterCountry}
            data={data}
          />
          <FiltersClearButton
            disabled={!hasFilters}
            onClick={handleFiltersClear}
          />
          <ExportDropdown
            data={// eslint-disable-next-line @typescript-eslint/no-unused-vars
            filteredData?.map(({ photo: _photo, ...item }) => ({
              ...item,
            }))}
            name="Employees"
          />
          <ReloadButton onClick={refetch} isLoading={isFetching} />
        </div>
      )}
      <div className="flex items-center">
        {!showFilters && getFiltersToggleButton()}
        {filteredData && (
          <span className="mx-2">
            {filteredData?.length}{' '}
            {reportsTo ? 'direct subordinates' : 'employees'}
          </span>
        )}
      </div>
      {getContent()}
      {!reportsTo && (
        <>
          <Separator />
          <EmployeesBarChart />
        </>
      )}
    </PanelStretched>
  );
};

function LocalSkeleton() {
  return (
    <>
      <Skeleton className="mx-2 h-6 w-32" />
      <ResponsiveGrid minWidth="18rem">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card className="h-full" key={index}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent className="flex gap-2">
              <Skeleton className="h-[70px] w-[70px] rounded-md" />
              <div className="flex flex-1 flex-col justify-between gap-2">
                <Skeleton className="ml-auto h-4 w-full max-w-[120px]" />
                <LocationSkeleton />
              </div>
            </CardContent>
          </Card>
        ))}
      </ResponsiveGrid>
    </>
  );
}

export default Employees;
