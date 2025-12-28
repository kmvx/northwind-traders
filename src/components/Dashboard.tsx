'use client';

import Link from 'next/link';

import type { DBStatsType } from '@/db/actions';
import { cn } from '@/lib/utils';
import { useQueryStats } from '@/net';
import { ErrorMessage, PanelCentred, Typography, WaitSpinner } from '@/ui';
import { getNavigationIconByUrl } from '@/utils';

import { Card, CardContent } from './ui';

interface DashboardProps {
  initialData?: DBStatsType;
}

const Dashboard: React.FC<DashboardProps> = ({ initialData }) => {
  const { data, isLoading, isFetching, error, refetch } = useQueryStats({
    initialData,
  });

  const getContent = () => {
    if (!data) return isLoading ? <WaitSpinner /> : null;

    const items = [
      {
        url: '/charts',
        title: 'charts',
        value: 8,
        iconClassName: 'u-hue-teal',
      },
      {
        url: '/customers',
        title: 'customers',
        value: data.customers,
        iconClassName: 'u-hue-red',
      },
      {
        url: '/employees',
        title: 'employees',
        value: data.employees,
        iconClassName: 'u-hue-blue',
      },
      {
        url: '/orders',
        title: 'orders',
        value: data.orders,
        iconClassName: 'u-hue-yellow',
      },
      {
        url: '/products',
        title: 'active products',
        value: data.productsActive,
        iconClassName: 'u-hue-violet',
      },
      {
        url: '/suppliers',
        title: 'suppliers',
        value: data.suppliers,
        iconClassName: 'u-hue-orange',
      },
    ] as const satisfies {
      url: string;
      title: string;
      value: number;
      iconClassName: string;
    }[];

    return (
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => {
          const Icon = getNavigationIconByUrl(item.url);
          return (
            <Link href={item.url} key={item.url}>
              <Card className="h-full rounded-md shadow-none transition hover:shadow-lg sm:min-w-78">
                <CardContent>
                  <div className="flex flex-wrap items-center justify-between gap-4 sm:flex-nowrap">
                    <span className="text-4xl font-bold">{item.value}</span>
                    <span className="uppercase">{item.title}</span>
                    <Icon
                      className={cn(
                        `size-12 rounded-md p-2`,
                        item.iconClassName,
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    );
  };

  return (
    <PanelCentred className="flex flex-col gap-4">
      <Typography variant="header1">Dashboard</Typography>
      <ErrorMessage error={error} retry={refetch} isFetching={isFetching} />
      {getContent()}
    </PanelCentred>
  );
};

export default Dashboard;
