'use client';

import { MapPinIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useQueryState } from 'nuqs';

import { IEmployees } from '@/models';
import { useQueryEmployees } from '@/net';
import {
  ErrorMessage,
  ExportDropdown,
  FilterCountry,
  FiltersClearButton,
  Flag,
  PanelStretched,
  ReloadButton,
  ResponsiveGrid,
} from '@/ui';
import { getEmployeeNameByData, isStringIncludes } from '@/utils';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';

export default function Employees({
  initialData,
}: {
  initialData: IEmployees;
}) {
  // Filters
  const [filterString, setFilterString] = useQueryState('q', {
    defaultValue: '',
  });
  const [filterCountry, setFilterCountry] = useQueryState('country', {
    defaultValue: '',
  });
  const hasFilters = !!filterString || !!filterCountry;
  function handleFiltersClear() {
    setFilterString('');
    setFilterCountry('');
  }

  // Network data
  const { data, isLoading, isFetching, error, refetch } = useQueryEmployees();

  // Filter data
  let filteredData = data ? data : isLoading ? initialData : [];
  if (filterString) {
    filteredData = filteredData?.filter((item) =>
      (['title', 'country', 'city'] as const).some((name) => {
        if (isStringIncludes(getEmployeeNameByData(item), filterString))
          return true;
        return isStringIncludes(item[name], filterString);
      }),
    );
  }
  const countries = [...new Set(data?.map((item) => item.country))].sort();
  if (filterCountry) {
    filteredData = filteredData?.filter(
      (item) => item.country === filterCountry,
    );
  }

  const getContent = () => {
    if (error) return <ErrorMessage error={error} retry={refetch} />;
    if (isLoading && filteredData.length === 0) return <LocalSceleton />;
    if (!filteredData) return null;

    return (
      <>
        <div className="m-2">{filteredData.length} employees</div>
        <ResponsiveGrid minWidth="18rem">
          {filteredData.map((item, index) => (
            <Link
              href={`/employees/${item.employeeId}`}
              key={item.employeeId}
              className="block"
            >
              <Card className="hover:shadow-lg transition h-full">
                <CardHeader>
                  <CardTitle title="Employee name">
                    {getEmployeeNameByData(item)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex gap-4">
                  <Image
                    src={`/assets/img/database/${item.firstName.toLowerCase()}.jpg`}
                    alt=""
                    title="Employee photo"
                    className="w-[70px] h-[70px] object-cover rounded-md"
                    width="70"
                    height="70"
                    priority={index === 0}
                  />
                  <div className="flex flex-col flex-1 justify-between">
                    <span
                      className="text-sm text-right font-medium"
                      title="Employee title"
                    >
                      {item.title}
                    </span>
                    <span
                      className="flex items-center justify-end gap-2 text-sm text-muted-foreground flex-wrap"
                      title="Employee location"
                    >
                      <MapPinIcon className="size-4" />
                      <span>
                        {item.country}, {item.city}
                      </span>
                      <Flag country={item.country} />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </ResponsiveGrid>
      </>
    );
  };

  return (
    <PanelStretched>
      <h2 className="m-2 text-center text-4xl">Employees</h2>
      <div className="flex flex-wrap items-center gap-2">
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
          countries={countries}
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
        <ReloadButton onClick={() => refetch()} isLoading={isFetching} />
      </div>
      {getContent()}
    </PanelStretched>
  );
}

function LocalSceleton() {
  return (
    <>
      <Skeleton className="m-2 h-6 w-32" />
      <ResponsiveGrid minWidth="18rem">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card className="h-full" key={index}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent className="flex gap-4">
              <Skeleton className="w-[70px] h-[70px] rounded-md" />
              <div className="flex flex-col flex-1 justify-between gap-2">
                <Skeleton className="h-4 w-full ml-auto max-w-[120px]" />
                <div className="flex items-center justify-end gap-2">
                  <MapPinIcon className="size-4 text-accent" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-8 rounded" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </ResponsiveGrid>
    </>
  );
}
