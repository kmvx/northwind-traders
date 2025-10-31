'use client';

import { parseAsInteger, useQueryState } from 'nuqs';
import { useState } from 'react';

import { useMemoWaitCursor, usePageSize } from '@/hooks';
import { type IOrders } from '@/models';
import { useQueryEmployees, useQueryOrders } from '@/net';
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
import {
  dateFromString,
  formatDateFromString,
  getEmployeeNameByData,
  isStringIncludes,
  joinFields,
} from '@/utils';

import { FilterCountry } from '../shared';
import { FilterYear, type IOrderCustom, OrdersCards, OrdersTable } from '.';

export default function Orders({ initialData }: { initialData?: IOrders }) {
  // Filters
  const [filterString, setFilterString] = useQueryState('q', {
    defaultValue: '',
  });
  const [filterCountry, setFilterCountry] = useQueryState('country', {
    defaultValue: '',
  });
  const [filterYear, setFilterYear] = useQueryState('year', parseAsInteger);
  const hasFilters = !!filterString || !!filterCountry || !!filterYear;
  function handleFiltersClear() {
    setFilterString('');
    setFilterCountry('');
    setFilterYear(null);
  }

  // Network data
  const { data, isLoading, isFetching, error, refetch } = useQueryOrders();
  const { data: dataEmployees } = useQueryEmployees();

  // Prepare data
  const [yearsSet, setYearsSet] = useState<Set<number>>(new Set());
  const preparedData = useMemoWaitCursor(() => {
    const yearsSetTemp = new Set<number>();

    const loadedData = data
      ? data
      : isLoading && initialData?.length
        ? initialData
        : [];

    const preparedData = loadedData?.map((item) => {
      const orderDate = item.orderDate;
      if (orderDate) {
        const date = new Date(item.orderDate);
        const year = date.getFullYear();
        yearsSetTemp.add(year);
      }

      const employee = dataEmployees?.find(
        (employee) => employee.employeeId === item.employeeId,
      );

      const result: IOrderCustom = {
        ...item,
        employeeName: employee ? getEmployeeNameByData(employee) : '',
        orderDate: formatDateFromString(item.orderDate),
        shippedDate: formatDateFromString(item.shippedDate),
        requiredDate: formatDateFromString(item.requiredDate),
        orderDateObject: dateFromString(item.orderDate),
        shippedDateObject: dateFromString(item.shippedDate),
        requiredDateObject: dateFromString(item.requiredDate),
        addressLine: joinFields(
          item.shipCountry,
          item.shipRegion,
          item.shipCity,
          item.shipAddress,
          item.shipPostalCode,
        ),
      };

      return result;
    });

    setYearsSet(yearsSetTemp);

    return preparedData;
  }, [data, dataEmployees]);

  // Filter data
  const filteredData = useMemoWaitCursor(() => {
    let filteredData = preparedData;

    if (filterString) {
      filteredData = filteredData?.filter((item) =>
        (
          [
            'orderId',
            'customerId',
            'employeeName',
            'shipVia',
            'orderDateObject',
            'shippedDateObject',
            'requiredDateObject',
            'freight',
            'shipName',
            'addressLine',
          ] as const
        ).some((name) => {
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
        return item.orderDateObject.getFullYear() === filterYear;
      });
    }

    return filteredData;
  }, [
    preparedData,
    initialData,
    isLoading,
    filterString,
    filterCountry,
    filterYear,
  ]);

  const isWidePage = (usePageSize()?.width ?? 0) >= 1024;

  const getContent = () => {
    if (error) return <ErrorMessage error={error} retry={refetch} />;
    if (isLoading && filteredData?.length === 0) return <WaitSpinner />;
    if (!filteredData) return null;
    if (filteredData.length === 0) return <div>Orders not found</div>;

    return isWidePage ? (
      <OrdersTable data={filteredData} />
    ) : (
      <OrdersCards data={filteredData} />
    );
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
