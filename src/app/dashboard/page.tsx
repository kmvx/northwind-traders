import { type Metadata } from 'next';

import { getDBStats } from '@/db/actions';
import { Dashboard } from '@/features/dashboard';
import { buildTitle } from '@/utils';

export const metadata: Metadata = {
  title: buildTitle('Dashboard'),
};

export default async function DashboardPage() {
  return <Dashboard initialData={await getDBStats()} />;
}
