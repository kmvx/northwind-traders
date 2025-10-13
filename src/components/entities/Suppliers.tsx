'use client';

import { MapPinIcon } from 'lucide-react';
import Link from 'next/link';
import { useQueryState } from 'nuqs';

import { type ISuppliers } from '@/models';
import { useQuerySuppliers } from '@/net';
import {
  ErrorMessage,
  ExportDropdown,
  FilterCountry,
  FiltersClearButton,
  Flag,
  PanelStretched,
  ReloadButton,
  ResponsiveGrid,
  Typography,
} from '@/ui';
import { isStringIncludes } from '@/utils';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';

export default function Suppliers({
  initialData,
}: {
  initialData?: ISuppliers;
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
  const { data, isLoading, isFetching, error, refetch } = useQuerySuppliers();

  // Filter data
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
  const countries = [...new Set(data?.map((item) => item.country))].sort();
  if (filterCountry) {
    filteredData = filteredData?.filter(
      (item) => item.country === filterCountry,
    );
  }

  const getContent = () => {
    if (error) return <ErrorMessage error={error} retry={refetch} />;
    if (isLoading && filteredData.length === 0) return <LocalSkeleton />;
    if (!filteredData) return null;

    return (
      <>
        <div className="m-2">{filteredData.length} suppliers</div>
        <ResponsiveGrid minWidth="15rem">
          {filteredData.map((item) => (
            <Link
              href={`/suppliers/${item.supplierId}`}
              key={item.supplierId}
              className="block"
            >
              <Card className="hover:shadow-lg transition h-full">
                <CardHeader>
                  <CardTitle title="Employee name">
                    {item.companyName}
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-full flex flex-col justify-end">
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
                </CardContent>
              </Card>
            </Link>
          ))}
        </ResponsiveGrid>
      </>
    );
  };

  if (!filteredData?.length && !hasFilters) {
    return null;
  }

  return (
    <PanelStretched className="flex flex-col gap-4">
      <Typography variant="header1">Suppliers</Typography>
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
          name="Suppliers"
        />
        <ReloadButton onClick={() => refetch()} isLoading={isFetching} />
      </div>
      {getContent()}
    </PanelStretched>
  );
}

function LocalSkeleton() {
  return (
    <>
      <Skeleton className="m-2 h-6 w-32" />
      <ResponsiveGrid minWidth="15rem">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card className="h-full" key={index}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent className="h-full flex flex-col justify-end">
              <div className="flex items-center justify-end gap-2">
                <MapPinIcon className="size-4 text-accent" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-8 rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </ResponsiveGrid>
    </>
  );
}
