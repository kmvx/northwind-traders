'use client';

import { useMemo, useState } from 'react';

import { Separator } from '@/components/ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FilterYear } from '@/entities/orders';
import { useNavigate } from '@/hooks';
import {
  useQueryCustomers,
  useQueryOrdersFiltered,
  useQuerySuppliers,
} from '@/net';
import { PanelCentred } from '@/ui';
import { getNavigationIconByUrl } from '@/utils';

import { BarChart, EmployeesBarChart, OrdersChart, WorldMapChart } from '.';

const Charts: React.FC = () => {
  const tabInfos = [
    {
      label: 'Orders',
      icon: getNavigationIconByUrl('/orders'),
      content: <OrdersCharts />,
    },
    {
      label: 'Customers',
      icon: getNavigationIconByUrl('/customers'),
      content: <CustomersCharts />,
    },
    {
      label: 'Suppliers',
      icon: getNavigationIconByUrl('/suppliers'),
      content: <SuppliersCharts />,
    },
  ].map((info) => ({ ...info, name: info.label.toLowerCase() }));

  return (
    <PanelCentred>
      <div className="flex flex-col gap-8">
        <OrdersChartsWithFilter />
        <Separator />
        <Tabs defaultValue={tabInfos[0].name} className="items-center">
          <TabsList>
            {tabInfos.map((info) => (
              <TabsTrigger
                value={info.name}
                key={info.name}
                className="cursor-pointer"
              >
                <info.icon />
                {info.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabInfos.map((info) => (
            <TabsContent value={info.name} key={info.name}>
              <div className="flex flex-col gap-4">
                <h3 className="text-center text-2xl">
                  Distribution of count of <b>{info.name}</b> by{' '}
                  <b>countries</b>
                </h3>
                {info.content}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        <Separator />
        <EmployeesBarChart />
      </div>
    </PanelCentred>
  );
};

const OrdersChartsWithFilter: React.FC = () => {
  // State
  const [filterYear, setFilterYear] = useState<number | null>(null);
  const [yearsSet, setYearsSet] = useState<Set<number>>(new Set());

  const {
    filteredData,
    queryResult: { isLoading, error, refetch },
  } = useQueryOrdersFiltered({
    filterYear,
    setYearsSet,
  });

  return (
    <div className="flex flex-col gap-2">
      <OrdersChart
        queryResult={{ data: filteredData, isLoading, error, refetch }}
      >
        <div className="flex justify-end">
          <FilterYear
            years={yearsSet}
            filterYear={filterYear}
            setFilterYear={setFilterYear}
          />
        </div>
      </OrdersChart>
    </div>
  );
};

const CustomersCharts: React.FC = () => {
  const { data, error, isLoading, refetch } = useQueryCustomers();

  const categoriesQueryResult = useMemo(
    () => ({
      categories: data?.map((item) => item.country),
      error,
      isLoading,
      refetch,
    }),
    [data, error, isLoading, refetch],
  );

  const hue = 30;

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <WorldMapChart
        name="customers"
        categoriesQueryResult={categoriesQueryResult}
        hue={hue}
        allowZoom
      />
      <BarChart
        name="customers"
        categoriesQueryResult={categoriesQueryResult}
        hue={hue}
      />
    </div>
  );
};

const OrdersCharts: React.FC = () => {
  // State
  const [filterYear, setFilterYear] = useState<number | null>(null);
  const [yearsSet, setYearsSet] = useState<Set<number>>(new Set());

  const {
    filteredData,
    queryResult: { error, isLoading, refetch },
  } = useQueryOrdersFiltered({
    filterYear,
    setYearsSet,
  });

  const categoriesQueryResult = useMemo(
    () => ({
      categories: filteredData?.map((item) => item.shipCountry),
      error,
      isLoading,
      refetch,
    }),
    [filteredData, error, isLoading, refetch],
  );

  const hue = 216;

  // Navigation
  const queries = useMemo(
    () => ({
      year: filterYear ? String(filterYear) : '',
    }),
    [filterYear],
  );
  const navigate = useNavigate({
    name: 'orders',
    categoryQueryName: 'ordersCountry',
    queries,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <FilterYear
          years={yearsSet}
          filterYear={filterYear}
          setFilterYear={setFilterYear}
        />
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <WorldMapChart
          name="orders"
          categoriesQueryResult={categoriesQueryResult}
          hue={hue}
          navigate={navigate}
          allowZoom
        />
        <BarChart
          name="orders"
          categoriesQueryResult={categoriesQueryResult}
          hue={hue}
          navigate={navigate}
        />
      </div>
    </div>
  );
};

const SuppliersCharts: React.FC = () => {
  const { data, error, isLoading, refetch } = useQuerySuppliers();

  const categoriesQueryResult = useMemo(
    () => ({
      categories: data?.map((item) => item.country),
      error,
      isLoading,
      refetch,
    }),
    [data, error, isLoading, refetch],
  );

  const hue = 120;

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <WorldMapChart
        name="suppliers"
        categoriesQueryResult={categoriesQueryResult}
        hue={hue}
        allowZoom
      />
      <BarChart
        name="suppliers"
        categoriesQueryResult={categoriesQueryResult}
        hue={hue}
      />
    </div>
  );
};

export default Charts;
