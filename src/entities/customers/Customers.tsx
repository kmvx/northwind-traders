'use client';

import Link from 'next/link';
import React, { memo, useMemo } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
  Skeleton,
} from '@/components/ui';
import { WorldMapChart } from '@/features/charts';
import { useFiltersToggle, useQueryStateFixed } from '@/hooks';
import { type ICustomer, type ICustomers } from '@/models';
import { useQueryCustomers } from '@/net';
import {
  DebouncedInput,
  ErrorMessage,
  ExportDropdown,
  FiltersClearButton,
  Pagination,
  PanelStretched,
  ReloadButton,
  ResponsiveGrid,
  Typography,
} from '@/ui';
import { isStringIncludes } from '@/utils';

import { FilterCountry, Location, LocationSkeleton } from '../shared';

interface CustomersProps {
  initialData?: ICustomers;
}

const Customers: React.FC<CustomersProps> = ({ initialData }) => {
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
  const { data, isLoading, isFetching, error, refetch } = useQueryCustomers({
    initialData,
  });

  // Filter data
  const filteredData = useMemo(() => {
    let filteredData = data;
    if (filterString) {
      filteredData = filteredData?.filter((item) =>
        (['companyName', 'country', 'city', 'customerId'] as const).some(
          (name) => {
            return isStringIncludes(item[name], filterString);
          },
        ),
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
    if (filteredData.length === 0) return <div>Customers not found</div>;

    return (
      <>
        <Pagination
          data={filteredData}
          defaultLimit={20}
          renderPage={(customers) => (
            <ResponsiveGrid minWidth="18rem">
              {customers.map((customer) => (
                <CustomerPreview
                  customer={customer}
                  key={customer.customerId}
                />
              ))}
            </ResponsiveGrid>
          )}
          extraNodes={!showFilters && getFiltersToggleButton()}
        />
        {!filterCountry && (
          <>
            <Separator />
            <WorldMapChart
              name="customers"
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
      <Typography variant="header1">Customers</Typography>
      {showFilters && (
        <div className="flex flex-wrap items-center gap-2">
          {getFiltersToggleButton()}
          <div className="flex-grow">
            <DebouncedInput
              placeholder="Enter filter string here"
              value={filterString}
              setValue={setFilterString}
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
            name="Customers"
          />
          <ReloadButton onClick={refetch} isLoading={isFetching} />
        </div>
      )}
      {getContent()}
    </PanelStretched>
  );
};

interface CustomerPreviewProps {
  customer: ICustomer;
}

const CustomerPreview: React.FC<CustomerPreviewProps> = memo(
  function CustomerPreview({ customer }) {
    return (
      <Link href={`/customers/${customer.customerId}`} className="block">
        <Card className="hover:shadow-lg transition h-full">
          <CardHeader>
            <CardTitle title="Customer name">{customer.companyName}</CardTitle>
          </CardHeader>
          <CardContent className="h-full flex flex-col justify-end gap-4">
            <div className="text-end" title="Customer company ID">
              {customer.customerId}
            </div>
            <Location
              country={customer.country}
              city={customer.city}
              title="Customer HQ location"
            />
          </CardContent>
        </Card>
      </Link>
    );
  },
);

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

export default Customers;
