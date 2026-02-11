'use client';

import type { DBStatsType } from '@/db/actions';

import { EntityStats } from '.';

interface DashboardProps {
  initialData?: DBStatsType | undefined;
}

const Dashboard: React.FC<DashboardProps> = ({ initialData }) => {
  return <EntityStats initialData={initialData} />;
};

export default Dashboard;
