import { type Metadata } from 'next';

import { Charts } from '@/components';
import { buildTitle } from '@/utils';

export const metadata: Metadata = {
  title: buildTitle('Charts'),
};

export default async function ChartsPage() {
  return <Charts />;
}
