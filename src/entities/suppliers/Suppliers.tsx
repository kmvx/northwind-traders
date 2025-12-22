'use client';

import Link from 'next/link';
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
import { useFiltersToggle, useQueryStateFixed } from '@/hooks';
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
  const { data, isLoading, isFetching, error, refetch } = useQuerySuppliers({
    initialData,
  });

  // Filter data
  const filteredData = useMemo(() => {
    let filteredData = data;
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
  }, [data, filterString, filterCountry]);

  const getContent = () => {
    if (error) return <ErrorMessage error={error} retry={refetch} />;
    if (isLoading && filteredData?.length === 0) return <LocalSkeleton />;
    if (!filteredData) return null;

    return (
      <>
        <ResponsiveGrid minWidth="16rem">
          {filteredData.map((item) => (
            <Link
              href={`/suppliers/${item.supplierId}`}
              key={item.supplierId}
              className="block"
            >
              <Card className="h-full rounded-md shadow-none transition hover:shadow-lg">
                <CardHeader>
                  <CardTitle title="Supplier name">
                    {item.companyName}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex h-full flex-col justify-end">
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
              categoriesQueryResult={{
                categories: filteredData?.map((item) => item.country),
                error,
                isLoading,
                refetch,
              }}
              showHeader
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
            data={filteredData as object[] as Record<string, unknown>[]}
            name="Suppliers"
          />
          <ReloadButton onClick={refetch} isFetching={isFetching} />
        </div>
      )}
      <div className="flex items-center">
        {!showFilters && getFiltersToggleButton()}
        {filteredData && (
          <span className="mx-2">{filteredData?.length} suppliers</span>
        )}
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
            <CardContent className="flex h-full flex-col justify-end">
              <LocationSkeleton />
            </CardContent>
          </Card>
        ))}
      </ResponsiveGrid>
    </>
  );
}

export default Suppliers;
