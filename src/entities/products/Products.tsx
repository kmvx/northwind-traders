'use client';

import React, { useMemo } from 'react';

import { useFiltersToggle, usePageSize, useQueryStateFixed } from '@/hooks';
import { type IProducts } from '@/models';
import { useQueryProducts } from '@/net';
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
import { parseAsBooleanOrUndefined } from '@/utils/nuqs';

import { FilterDiscontinued, ProductsCards, ProductsTable } from '.';

interface ProductsProps {
  supplierId?: number;
  initialData?: IProducts;
}

const Products: React.FC<ProductsProps> = ({ supplierId, initialData }) => {
  // Filters
  const { showFilters, getFiltersToggleButton } = useFiltersToggle();
  const [filterString, setFilterString] = useQueryStateFixed('productsFilter', {
    defaultValue: '',
  });
  const [filterDiscontinued, setDiscontinued] = useQueryStateFixed(
    'discontinued',
    parseAsBooleanOrUndefined,
  );
  const hasFilters = !!filterString || filterDiscontinued != null;
  function handleFiltersClear() {
    setFilterString('');
    setDiscontinued(null);
  }

  // Network data
  const { data, isLoading, isFetching, error, refetch } = useQueryProducts({
    supplierId,
    initialData,
  });

  // Filter data
  const filteredData = useMemo(() => {
    let filteredData = data;
    if (filterString) {
      filteredData = filteredData?.filter((item) =>
        (['productName', 'quantityPerUnit'] as const).some((name) => {
          return isStringIncludes(String(item[name]), filterString);
        }),
      );
    }
    if (filterDiscontinued != null) {
      filteredData = filteredData?.filter(
        (item) => item.discontinued === filterDiscontinued,
      );
    }
    return filteredData;
  }, [data, filterString, filterDiscontinued]);

  const extraNodes = useMemo(
    () => !showFilters && getFiltersToggleButton(),
    [showFilters, getFiltersToggleButton],
  );

  const isWidePage = usePageSize().isWidePage;

  const getContent = () => {
    if (error) return <ErrorMessage error={error} retry={refetch} />;
    if (isLoading && filteredData?.length === 0) return <WaitSpinner />;
    if (!filteredData) return null;
    if (filteredData.length === 0) {
      return (
        <div className="flex items-center gap-2">
          {extraNodes}
          <span>Products not found</span>
        </div>
      );
    }

    return isWidePage ? (
      <ProductsTable data={filteredData} extraNodes={extraNodes} />
    ) : (
      <ProductsCards data={filteredData} extraNodes={extraNodes} />
    );
  };

  if (!filteredData?.length && !hasFilters) {
    return null;
  }

  const Header =
    supplierId == undefined ? Typography.Header1 : Typography.Header2;

  return (
    <PanelStretched className="flex flex-col gap-4">
      <Header>Products</Header>
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
          <FilterDiscontinued
            filterDiscontinued={filterDiscontinued}
            setDiscontinued={setDiscontinued}
          />
          <FiltersClearButton
            disabled={!hasFilters}
            onClick={handleFiltersClear}
          />
          <ExportDropdown
            data={filteredData as object[] as Record<string, unknown>[]}
            name="Products"
          />
          <ReloadButton onClick={refetch} isLoading={isFetching} />
        </div>
      )}
      {getContent()}
    </PanelStretched>
  );
};

export default Products;
