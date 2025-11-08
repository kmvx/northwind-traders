'use client';

import { useMemo, useState } from 'react';

import { Separator } from '@/components/ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FilterYear } from '@/entities/orders';
import { useQueryCustomers, useQueryOrders, useQuerySuppliers } from '@/net';
import { PanelCentred } from '@/ui';

import { BarChart, OrdersChart, WorldMapChart } from '.';

const Charts: React.FC = () => {
  const tabInfos = [
    { label: 'Orders', content: <OrdersCharts /> },
    { label: 'Customers', content: <CustomersCharts /> },
    { label: 'Suppliers', content: <SuppliersCharts /> },
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
                {info.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabInfos.map((info) => (
            <TabsContent value={info.name} key={info.name}>
              <div className="flex flex-col gap-4">
                <h3 className="text-center text-2xl">
                  Distribution of count of <b>{info.name}</b> by countries
                </h3>
                {info.content}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </PanelCentred>
  );
};

const OrdersChartsWithFilter: React.FC = () => {
  const queryResult = useQueryOrders();
  const [filterYear, setFilterYear] = useState<number | null>(null);

  const years = useMemo(() => {
    const result = new Set<number>();
    queryResult.data?.forEach((order) => {
      result.add(new Date(order.orderDate).getFullYear());
    });
    return result;
  }, [queryResult.data]);

  const filteredQueryResult = useMemo(() => {
    const result = { ...queryResult };
    result.data = queryResult.data?.filter((order) => {
      // TODO: Optimize
      return (
        filterYear == null ||
        new Date(order.orderDate).getFullYear() === filterYear
      );
    });
    return result;
  }, [filterYear, queryResult]);

  return (
    <div className="flex flex-col gap-2">
      <OrdersChart queryResult={filteredQueryResult}>
        <div className="flex justify-end">
          <FilterYear {...{ years, filterYear, setFilterYear }} />
        </div>
      </OrdersChart>
    </div>
  );
};

const CustomersCharts: React.FC = () => {
  const { data, error, isLoading, refetch } = useQueryCustomers();

  const countriesQueryResult = useMemo(
    () => ({
      countries: data?.map((item) => item.country),
      error,
      isLoading,
      refetch,
    }),
    [data, error, isLoading, refetch],
  );

  const hue = 30;

  return (
    <div className="flex flex-wrap gap-2">
      <WorldMapChart
        name="customers"
        {...{ countriesQueryResult, hue }}
        allowZoom
      />
      <BarChart name="customers" {...{ countriesQueryResult, hue }} />
    </div>
  );
};

const OrdersCharts: React.FC = () => {
  const { data, error, isLoading, refetch } = useQueryOrders();

  const countriesQueryResult = useMemo(
    () => ({
      countries: data?.map((item) => item.shipCountry),
      error,
      isLoading,
      refetch,
    }),
    [data, error, isLoading, refetch],
  );

  const hue = 216;

  return (
    <div className="flex flex-wrap gap-2">
      <WorldMapChart
        name="orders"
        {...{ countriesQueryResult, hue }}
        allowZoom
      />
      <BarChart name="orders" {...{ countriesQueryResult, hue }} />
    </div>
  );
};

const SuppliersCharts: React.FC = () => {
  const { data, error, isLoading, refetch } = useQuerySuppliers();

  const countriesQueryResult = useMemo(
    () => ({
      countries: data?.map((item) => item.country),
      error,
      isLoading,
      refetch,
    }),
    [data, error, isLoading, refetch],
  );

  const hue = 120;

  return (
    <div className="flex flex-wrap gap-2">
      <WorldMapChart
        name="suppliers"
        {...{ countriesQueryResult, hue }}
        allowZoom
      />
      <BarChart name="suppliers" {...{ countriesQueryResult, hue }} />
    </div>
  );
};

export default Charts;
