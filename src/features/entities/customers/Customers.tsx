'use client';

import Link from 'next/link';
import { useQueryState } from 'nuqs';
import React, { useMemo } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Skeleton,
} from '@/components/ui';
import { type ICustomers } from '@/models';
import { useQueryCustomers } from '@/net';
import {
  ErrorMessage,
  ExportDropdown,
  FilterCountry,
  FiltersClearButton,
  Pagination,
  PanelStretched,
  ReloadButton,
  ResponsiveGrid,
  Typography,
} from '@/ui';
import { isStringIncludes } from '@/utils';

import { Location, LocationSkeleton } from '../shared';

export default function Customers({
  initialData,
}: {
  initialData?: ICustomers;
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
  const { data, isLoading, isFetching, error, refetch } = useQueryCustomers();

  const countries = useMemo(
    () => [...new Set(data?.map((item) => item.country))].sort(),
    [data],
  );

  // Filter data
  const filteredData = useMemo(() => {
    let filteredData = data
      ? data
      : isLoading && initialData?.length
        ? initialData
        : [];
    if (filterString) {
      filteredData = filteredData?.filter((item) =>
        (['companyName', 'country', 'city'] as const).some((name) => {
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
  }, [data, initialData, filterCountry, filterString, isLoading]);

  const getContent = () => {
    if (error) return <ErrorMessage error={error} retry={refetch} />;
    if (isLoading && filteredData.length === 0) return <LocalSkeleton />;
    if (!filteredData) return null;

    return (
      <>
        <Pagination
          data={filteredData}
          defaultLimit={20}
          renderPage={(items) => (
            <ResponsiveGrid minWidth="18rem">
              {items.map((item) => (
                <Link
                  href={`/customers/${item.customerId}`}
                  key={item.customerId}
                  className="block"
                >
                  <Card className="hover:shadow-lg transition h-full">
                    <CardHeader>
                      <CardTitle title="Customer name">
                        {item.companyName}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="h-full flex flex-col justify-end">
                      <div className="text-end" title="Customer company ID">
                        {item.customerId}
                      </div>
                      <Location
                        country={item.country}
                        city={item.city}
                        title="Customer HQ location"
                      />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </ResponsiveGrid>
          )}
        />
      </>
    );
  };

  if (!filteredData?.length && !hasFilters) {
    return null;
  }

  return (
    <PanelStretched className="flex flex-col gap-4">
      <Typography variant="header1">Customers</Typography>
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
          data={filteredData?.map(({ ...item }) => ({
            ...item,
          }))}
          name="Customers"
        />
        <ReloadButton onClick={refetch} isLoading={isFetching} />
      </div>
      {getContent()}
    </PanelStretched>
  );
}

function LocalSkeleton() {
  return (
    <>
      <ResponsiveGrid minWidth="15rem">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card className="h-full" key={index}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent className="h-full flex flex-col justify-end gap-4">
              <Skeleton className="h-4 w-full ml-auto max-w-[40px]" />
              <LocationSkeleton />
            </CardContent>
          </Card>
        ))}
      </ResponsiveGrid>
    </>
  );
}
