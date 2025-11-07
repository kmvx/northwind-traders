'use client';

import { CustomersBarChart } from '@/features/charts/BarChart';
import { CustomersWorldMapChart } from '@/features/charts/WorldMapChart';
import { useQueryCustomers } from '@/net';
import { PanelCentred } from '@/ui';

import HeaderChart from './HeaderChart';

const Charts: React.FC = () => {
  // Network data
  const {
    data: dataCustomers,
    error: errorCustomers,
    isLoading: isLoadingCustomers,
    refetch: refetchCustomers,
  } = useQueryCustomers();

  return (
    <PanelCentred className="flex flex-col items-center gap-4">
      <HeaderChart name="customers" />
      <div className="flex flex-wrap gap-2">
        <CustomersWorldMapChart
          countriesQueryResult={{
            countries: dataCustomers?.map((item) => item.country),
            error: errorCustomers,
            isLoading: isLoadingCustomers,
            refetch: refetchCustomers,
          }}
          hue={30}
          allowZoom
        />
        <CustomersBarChart />
      </div>
    </PanelCentred>
  );
};

export default Charts;
