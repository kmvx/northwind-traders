'use client';

import { parseAsInteger, useQueryState } from 'nuqs';
import { useMemo } from 'react';

import { type IOrders } from '@/models';
import { useQueryOrders } from '@/net';
import {
  DebouncedInput,
  ErrorMessage,
  ExportDropdown,
  FilterCountry,
  FiltersClearButton,
  PanelStretched,
  ReloadButton,
  Typography,
  WaitSpinner,
} from '@/ui';
import { dateFromString, isStringIncludes } from '@/utils';

import { FilterYear, OrdersTable } from '.';

export default function Orders({ initialData }: { initialData?: IOrders }) {
  // Filters
  const [filterString, setFilterString] = useQueryState('q', {
    defaultValue: '',
  });
  const [filterCountry, setFilterCountry] = useQueryState('country', {
    defaultValue: '',
  });
  const [filterYear, setFilterYear] = useQueryState('year', parseAsInteger);
  const hasFilters = !!filterString || !!filterCountry;
  function handleFiltersClear() {
    setFilterString('');
    setFilterCountry('');
    setFilterYear(null);
  }

  // Network data
  const { data, isLoading, isFetching, error, refetch } = useQueryOrders();

  // Compute orders creation years
  const yearsSet = useMemo(() => {
    const yearsSet = new Set<number>();
    data?.map((item) => {
      const orderDate = item.orderDate;
      if (orderDate) {
        const date = new Date(item.orderDate);
        const year = date.getFullYear();
        yearsSet.add(year);
      }
    });
    return yearsSet;
  }, [data]);

  // Filter data
  const filteredData = useMemo(() => {
    let filteredData = data
      ? data
      : isLoading && initialData?.length
        ? initialData
        : [];

    if (filterString) {
      filteredData = filteredData?.filter((item) =>
        (['shipAddress', 'shipCity'] as const).some((name) => {
          return isStringIncludes(String(item[name]), filterString);
        }),
      );
    }

    if (filterCountry) {
      filteredData = filteredData?.filter(
        (item) => item.shipCountry === filterCountry,
      );
    }

    if (filterYear != null) {
      filteredData = filteredData?.filter((item) => {
        // TODO: Cache dateFromString() result
        return dateFromString(item.orderDate).getFullYear() === filterYear;
      });
    }

    return filteredData;
  }, [data, initialData, isLoading, filterString, filterCountry, filterYear]);

  const getContent = () => {
    if (error) return <ErrorMessage error={error} retry={refetch} />;
    if (isLoading && filteredData.length === 0) return <WaitSpinner />;
    if (!filteredData) return null;
    if (filteredData.length === 0) return <div>Orders not found</div>;

    return <OrdersTable data={filteredData} />;
  };

  if (!filteredData?.length && !hasFilters) {
    return null;
  }

  return (
    <PanelStretched className="flex flex-col gap-4">
      <Typography variant="header1">Orders</Typography>
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex-grow">
          <DebouncedInput
            placeholder="Enter filter string here"
            value={filterString}
            setValue={setFilterString}
            title="String filter"
          />
        </div>
        <FilterYear {...{ years: yearsSet, filterYear, setFilterYear }} />
        <FilterCountry
          filterCountry={filterCountry}
          setFilterCountry={setFilterCountry}
          data={data}
          countryPropertyName="shipCountry"
        />
        <FiltersClearButton
          disabled={!hasFilters}
          onClick={handleFiltersClear}
        />
        <ExportDropdown
          data={filteredData as object[] as Record<string, unknown>[]}
          name="Orders"
        />
        <ReloadButton onClick={refetch} isLoading={isFetching} />
      </div>
      {getContent()}
    </PanelStretched>
  );
}
