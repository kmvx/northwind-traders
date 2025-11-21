'use client';

import { parseAsInteger } from 'nuqs';
import React, { useMemo } from 'react';

import { Separator } from '@/components/ui';
import { OrdersChart, WorldMapChart } from '@/features/charts';
import { usePageSize, useQueryStateFixed } from '@/hooks';
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
  withWaitCursor,
} from '@/utils';

import { FilterEmployee } from '../employees';
import { FilterCountry } from '../shared';
import { FilterYear, type IOrderFormatted, OrdersCards, OrdersTable } from '.';

interface OrdersProps {
  initialData?: IOrders;
  customerId?: string;
  employeeId?: number;
}

const Orders: React.FC<OrdersProps> = ({
  initialData,
  customerId,
  employeeId,
}) => {
  // Filters
  const [filterString, setFilterString] = useQueryStateFixed('ordersFilter', {
    defaultValue: '',
  });
  const [filterCountry, setFilterCountry] = useQueryStateFixed(
    'ordersCountry',
    {
      defaultValue: '',
    },
  );
  const [filterYear, setFilterYear] = useQueryStateFixed(
    'year',
    parseAsInteger,
  );
  const [filterEmployeeId, setFilterEmployeeId] = useQueryStateFixed(
    'employeeId',
    parseAsInteger,
  );
  const hasFilters =
    !!filterString || !!filterCountry || !!filterYear || !!filterEmployeeId;
  function handleFiltersClear() {
    setFilterString('');
    setFilterCountry('');
    setFilterYear(null);
    setFilterEmployeeId(null);
  }

  // Network data
  const queryResult = useQueryOrders({
    customerId,
    employeeId,
    initialData,
  });
  const { data, isLoading, isFetching, error, refetch } = queryResult;
  const { data: dataEmployees } = useQueryEmployees();

  // Prepare data
  const { preparedData, yearsSet } = useMemo(
    () =>
      withWaitCursor(() => {
        const yearsSet = new Set<number>();

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
            yearsSet.add(year);
          }

          const employee = dataEmployees?.find(
            (employee) => employee.employeeId === item.employeeId,
          );

          const result: IOrderFormatted = {
            ...item,
            employeeName: employee ? getEmployeeNameByData(employee) : '',
            orderDateFormatted: formatDateFromString(item.orderDate),
            shippedDateFormatted: formatDateFromString(item.shippedDate),
            requiredDateFormatted: formatDateFromString(item.requiredDate),
            orderDateObject: dateFromString(item.orderDate),
            shippedDateObject: dateFromString(item.shippedDate),
            requiredDateObject: dateFromString(item.requiredDate),
            shipLocation: joinFields(
              item.shipCountry,
              item.shipRegion,
              item.shipCity,
              item.shipPostalCode,
            ),
          };

          return result;
        });

        return { preparedData, yearsSet };
      }),
    [isLoading, initialData, data, dataEmployees],
  );

  // Filter data
  const filteredData = useMemo(
    () =>
      withWaitCursor(() => {
        return preparedData?.filter((item) => {
          if (
            filterString &&
            !(
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
                'shipCountry',
                'shipRegion',
                'shipCity',
                'shipCity',
                'shipAddress',
              ] as const
            ).some((name) => {
              return isStringIncludes(String(item[name]), filterString);
            })
          )
            return false;

          if (filterCountry && item.shipCountry !== filterCountry) return false;

          if (
            filterYear != null &&
            item.orderDateObject.getFullYear() !== filterYear
          )
            return false;

          if (filterEmployeeId != null && item.employeeId !== filterEmployeeId)
            return false;

          return true;
        });
      }),
    [preparedData, filterString, filterCountry, filterYear, filterEmployeeId],
  );

  const filteredQueryResult = useMemo(() => {
    const result = { ...queryResult };
    result.data = filteredData;
    return result;
  }, [queryResult, filteredData]);

  const isWidePage = usePageSize().isWidePage;

  const getContent = () => {
    if (error) return <ErrorMessage error={error} retry={refetch} />;
    if (isLoading && filteredData?.length === 0) return <WaitSpinner />;
    if (!filteredData) return null;
    if (filteredData.length === 0) return <div>Orders not found</div>;

    return (
      <>
        {isWidePage ? (
          <OrdersTable
            data={filteredData}
            isCustomerPage={!!customerId}
            isEmployeePage={!!employeeId}
          />
        ) : (
          <OrdersCards data={filteredData} />
        )}
        {!customerId && !filterCountry && (
          <>
            <Separator />
            <WorldMapChart
              name="orders"
              categoriesQueryResult={{
                categories: filteredData?.map((item) => item.shipCountry),
                error,
                isLoading,
                refetch,
              }}
              showHeader
            />
          </>
        )}
        <Separator />
        <OrdersChart queryResult={filteredQueryResult} />
      </>
    );
  };

  if (!filteredData?.length && !hasFilters) {
    return null;
  }

  const Header =
    customerId == undefined && employeeId == undefined
      ? Typography.Header1
      : Typography.Header2;

  return (
    <PanelStretched className="flex flex-col gap-4">
      <Header>Orders</Header>
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
        {!employeeId && (
          <FilterEmployee {...{ filterEmployeeId, setFilterEmployeeId }} />
        )}
        <FiltersClearButton
          disabled={!hasFilters}
          onClick={handleFiltersClear}
        />
        <ExportDropdown
          data={filteredData as object[] as Record<string, unknown>[]}
          name="Orders"
        />
        <ReloadButton
          onClick={refetch}
          isLoading={isFetching && typeof window !== 'undefined'}
        />
      </div>
      {getContent()}
    </PanelStretched>
  );
};

export default Orders;
