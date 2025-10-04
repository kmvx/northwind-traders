'use client';

import { MapPinIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { useQueryEmployees } from '@/net';
import { ErrorMessage, Flag, PanelStretched, ResponsiveGrid } from '@/ui';
import { getEmployeeNameByData, isStringIncludes } from '@/utils';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';

export default function Employees() {
  // Filters
  const [stringFilter, setStringFilter] = useState('');

  // Network data
  const { data, isLoading, error, refetch } = useQueryEmployees();

  // Filter data
  let filteredData = data;
  if (stringFilter) {
    filteredData = filteredData?.filter((item) =>
      ['title', 'country', 'city'].some((name) => {
        if (isStringIncludes(getEmployeeNameByData(item), stringFilter))
          return true;
        return isStringIncludes(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (item as Record<string, any>)[name],
          stringFilter,
        );
      }),
    );
  }

  const getContent = () => {
    if (error) return <ErrorMessage error={error} retry={refetch} />;
    if (isLoading) return <LocalSceleton />;
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
            value={stringFilter}
            onChange={(e) => setStringFilter(e.target.value)}
            title="String filter"
          />
        </div>
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
