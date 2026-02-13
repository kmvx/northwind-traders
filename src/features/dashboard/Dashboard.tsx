'use client';

import type { DBStatsType } from '@/db/actions';
import { PanelCentred, Typography } from '@/ui';

import {
  EntityStats,
  TopCustomersBySales,
  TopEmployeesBySales,
  TopProducsBySales,
  TopSuppliersBySales,
} from '.';

interface DashboardProps {
  initialData?: DBStatsType | undefined;
}

const Dashboard: React.FC<DashboardProps> = ({ initialData }) => {
  return (
    <PanelCentred className="flex flex-col gap-4">
      <Typography variant="header1">Dashboard</Typography>
      <EntityStats initialData={initialData} />
      <div className="grid gap-4 lg:grid-cols-2">
        <TopEmployeesBySales />
        <TopCustomersBySales />
        <TopProducsBySales />
        <TopSuppliersBySales />
      </div>
    </PanelCentred>
  );
};

export default Dashboard;
