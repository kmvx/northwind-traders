'use client';

import { CustomersBarChart } from '@/features/charts/BarChart';
import { CustomersWorldMapChart } from '@/features/charts/WorldMapChart';
import { useQueryCustomers } from '@/net';

const Charts: React.FC = () => {
  // Network data
  const {
    data: dataCustomers,
    error: errorCustomers,
    isLoading: isLoadingCustomers,
    refetch: refetchCustomers,
  } = useQueryCustomers();

  return (
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
      <CustomersBarChart />;
    </div>
  );
};

export default Charts;
