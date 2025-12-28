import { type Metadata } from 'next';

import { Dashboard } from '@/components';
import { getDBStats } from '@/db/actions';
import { buildTitle } from '@/utils';

export const metadata: Metadata = {
  title: buildTitle('Dashboard'),
};

export default async function DashboardPage() {
  return <Dashboard initialData={await getDBStats()} />;
}
