import { type Metadata } from 'next';

import { User } from '@/features/auth';
import { buildTitle } from '@/utils';

export const metadata: Metadata = {
  title: buildTitle('User'),
};

export default async function UserPage({ params }: { params: { id: string } }) {
  return <User userId={(await params).id} />;
}
