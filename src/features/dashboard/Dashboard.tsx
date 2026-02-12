'use client';

import type { DBStatsType } from '@/db/actions';
import { PanelCentred, Typography } from '@/ui';

import { EntityStats, TopEmployeesBySales } from '.';

interface DashboardProps {
  initialData?: DBStatsType | undefined;
}

const Dashboard: React.FC<DashboardProps> = ({ initialData }) => {
  return (
    <PanelCentred className="flex flex-col gap-4">
      <Typography variant="header1">Dashboard</Typography>
      <EntityStats initialData={initialData} />
      <TopEmployeesBySales />
    </PanelCentred>
  );
};

export default Dashboard;
