'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CustomersBarChart,
  OrdersBarChart,
  SuppliersBarChart,
} from '@/features/charts/BarChart';
import {
  CustomersWorldMapChart,
  OrdersWorldMapChart,
  SuppliersWorldMapChart,
} from '@/features/charts/WorldMapChart';
import { useQueryCustomers, useQueryOrders, useQuerySuppliers } from '@/net';
import { PanelCentred } from '@/ui';

const Charts: React.FC = () => {
  const tabInfos = [
    { label: 'Orders', content: <OrdersCharts /> },
    { label: 'Customers', content: <CustomersCharts /> },
    { label: 'Suppliers', content: <SuppliersCharts /> },
  ].map((info) => ({ ...info, name: info.label.toLowerCase() }));

  return (
    <PanelCentred>
      <Tabs defaultValue={tabInfos[0].name}>
        <TabsList>
          {tabInfos.map((info) => (
            <TabsTrigger value={info.name} key={info.name}>
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
    </PanelCentred>
  );
};

const CustomersCharts: React.FC = () => {
  const { data, error, isLoading, refetch } = useQueryCustomers();

  return (
    <div className="flex flex-wrap gap-2">
      <CustomersWorldMapChart
        countriesQueryResult={{
          countries: data?.map((item) => item.country),
          error: error,
          isLoading: isLoading,
          refetch: refetch,
        }}
        hue={30}
        allowZoom
      />
      <CustomersBarChart />
    </div>
  );
};

const OrdersCharts: React.FC = () => {
  const { data, error, isLoading, refetch } = useQueryOrders();

  return (
    <div className="flex flex-wrap gap-2">
      <OrdersWorldMapChart
        countriesQueryResult={{
          countries: data?.map((item) => item.shipCountry),
          error: error,
          isLoading: isLoading,
          refetch: refetch,
        }}
        hue={216}
        allowZoom
      />
      <OrdersBarChart />
    </div>
  );
};

const SuppliersCharts: React.FC = () => {
  const { data, error, isLoading, refetch } = useQuerySuppliers();

  return (
    <div className="flex flex-wrap gap-2">
      <SuppliersWorldMapChart
        countriesQueryResult={{
          countries: data?.map((item) => item.country),
          error: error,
          isLoading: isLoading,
          refetch: refetch,
        }}
        hue={120}
        allowZoom
      />
      <SuppliersBarChart />
    </div>
  );
};

export default Charts;
