'use client';

import Link from 'next/link';
import { useQueryState } from 'nuqs';
import React, { useMemo } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { type IProducts } from '@/models';
import { useQueryProducts } from '@/net';
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
  WaitSpinner,
} from '@/ui';
import { isStringIncludes } from '@/utils';

export default function Products({ initialData }: { initialData?: IProducts }) {
  // Filters
  const [filterString, setFilterString] = useQueryState('q', {
    defaultValue: '',
  });
  const hasFilters = !!filterString;
  function handleFiltersClear() {
    setFilterString('');
  }

  // Network data
  const { data, isLoading, isFetching, error, refetch } = useQueryProducts();

  // Filter data
  const filteredData = useMemo(() => {
    let filteredData = data
      ? data
      : isLoading && initialData?.length
        ? initialData
        : [];
    if (filterString) {
      filteredData = filteredData?.filter((item) =>
        (['productName', 'quantityPerUnit'] as const).some((name) => {
          return isStringIncludes(String(item[name]), filterString);
        }),
      );
    }
    return filteredData;
  }, [data, initialData, filterString, isLoading]);

  const getContent = () => {
    if (error) return <ErrorMessage error={error} retry={refetch} />;
    if (isLoading && filteredData.length === 0) return <WaitSpinner />;
    if (!filteredData) return null;
    if (filteredData.length === 0) return <div>Products not found</div>;

    return (
      <Pagination
        data={filteredData}
        defaultLimit={20}
        renderPage={(items) => (
          <ResponsiveGrid minWidth="18rem">
            {items.map((item) => (
              <Link
                href={`/products/${item.productId}`}
                key={item.productName}
                className="block"
              >
                <Card className="hover:shadow-lg transition h-full">
                  <CardHeader>
                    <CardTitle title="Product name">
                      {item.productName}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-full flex flex-col justify-end">
                    <div className="text-end" title="Quantity per unit">
                      {item.quantityPerUnit}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </ResponsiveGrid>
        )}
      />
    );
  };

  if (!filteredData?.length && !hasFilters) {
    return null;
  }

  return (
    <PanelStretched className="flex flex-col gap-4">
      <Typography variant="header1">Products</Typography>
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
          data={filteredData.map(({ ...item }) => ({
            ...item,
          }))}
          name="Products"
        />
        <ReloadButton onClick={refetch} isLoading={isFetching} />
      </div>
      {getContent()}
    </PanelStretched>
  );
}
