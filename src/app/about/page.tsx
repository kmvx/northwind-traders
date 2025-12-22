import { type Metadata } from 'next';

import { About } from '@/components';
import { buildTitle } from '@/utils';

export const metadata: Metadata = {
  title: buildTitle('About'),
};

export default function HomePage() {
  return <About />;
}
