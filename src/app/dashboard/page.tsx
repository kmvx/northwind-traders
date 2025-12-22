import { type Metadata } from 'next';

import { Dashboard } from '@/components';
import { buildTitle } from '@/utils';

export const metadata: Metadata = {
  title: buildTitle('Dashboard'),
};

export default function HomePage() {
  return <Dashboard />;
}
