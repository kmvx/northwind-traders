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
  Separator,
  Skeleton,
} from '@/components/ui';
import { WorldMapChart } from '@/features/charts';
import { type ISuppliers } from '@/models';
import { useQuerySuppliers } from '@/net';
import {
  ErrorMessage,
  ExportDropdown,
  FiltersClearButton,
  PanelStretched,
  ReloadButton,
  ResponsiveGrid,
  Typography,
} from '@/ui';
import { isStringIncludes } from '@/utils';

import { FilterCountry, Location, LocationSkeleton } from '../shared';

interface SuppliersProps {
  initialData?: ISuppliers;
}

const Suppliers: React.FC<SuppliersProps> = ({ initialData }) => {
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
  }, [data, initialData, isLoading, filterString, filterCountry]);

  const getContent = () => {
    if (error) return <ErrorMessage error={error} retry={refetch} />;
    if (isLoading && filteredData.length === 0) return <LocalSkeleton />;
    if (!filteredData) return null;

    return (
      <>
        <div className="mx-2">{filteredData.length} suppliers</div>
        <ResponsiveGrid minWidth="16rem">
          {filteredData.map((item) => (
            <Link
              href={`/suppliers/${item.supplierId}`}
              key={item.supplierId}
              className="block"
            >
              <Card className="hover:shadow-lg transition h-full">
                <CardHeader>
                  <CardTitle title="Supplier name">
                    {item.companyName}
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-full flex flex-col justify-end">
                  <Location
                    country={item.country}
                    city={item.city}
                    title="Supplier location"
                  />
                </CardContent>
              </Card>
            </Link>
          ))}
        </ResponsiveGrid>
        {!filterCountry && (
          <>
            <Separator />
            <WorldMapChart
              name="suppliers"
              countriesQueryResult={{
                countries: filteredData?.map((item) => item.country),
                error,
                isLoading,
                refetch,
              }}
            />
          </>
        )}
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
          data={data}
        />
        <FiltersClearButton
          disabled={!hasFilters}
          onClick={handleFiltersClear}
        />
        <ExportDropdown
          data={filteredData as object[] as Record<string, unknown>[]}
          name="Suppliers"
        />
        <ReloadButton onClick={refetch} isLoading={isFetching} />
      </div>
      {getContent()}
    </PanelStretched>
  );
};

function LocalSkeleton() {
  return (
    <>
      <Skeleton className="mx-2 h-6 w-32" />
      <ResponsiveGrid minWidth="15rem">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card className="h-full" key={index}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent className="h-full flex flex-col justify-end">
              <LocationSkeleton />
            </CardContent>
          </Card>
        ))}
      </ResponsiveGrid>
    </>
  );
}

export default Suppliers;
