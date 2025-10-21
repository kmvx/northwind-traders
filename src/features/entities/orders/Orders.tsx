'use client';

import { useQueryState } from 'nuqs';
import React, { useMemo } from 'react';

import { type IOrders } from '@/models';
import { useQueryOrders } from '@/net';
import {
  DebouncedInput,
  ErrorMessage,
  ExportDropdown,
  FiltersClearButton,
  PanelStretched,
  ReloadButton,
  Typography,
  WaitSpinner,
} from '@/ui';
import { isStringIncludes } from '@/utils';

import { OrdersTable } from '.';

export default function Orders({ initialData }: { initialData?: IOrders }) {
  // Filters
  const [filterString, setFilterString] = useQueryState('q', {
    defaultValue: '',
  });
  const hasFilters = !!filterString;
  function handleFiltersClear() {
    setFilterString('');
  }

  // Network data
  const { data, isLoading, isFetching, error, refetch } = useQueryOrders();

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
    return filteredData;
  }, [data, initialData, isLoading, filterString]);

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
