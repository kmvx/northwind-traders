'use client';

import { useQuery } from '@tanstack/react-query';
import { AtSignIcon, CalendarDays, Clock } from 'lucide-react';

import { Card, CardContent } from '@/components/ui';
import {
  DateTime,
  ErrorMessage,
  ReloadButton,
  ResponsiveItem,
  Typography,
  WaitSpinner,
} from '@/ui';

import { getUserAccounts } from '.';

interface UserAccountsProps {
  userId: string;
}
const UserAccounts: React.FC<UserAccountsProps> = ({ userId }) => {
  const { data, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['auth.getUserAccounts', userId],
    queryFn: async () => await getUserAccounts(userId),
  });

  const getContent = () => {
    if (!data) return isLoading ? <WaitSpinner /> : null;
    if (data.length === 0) return <div>No active accounts</div>;

    return data.map((account) => {
      return (
        <Card key={account.id} className="rounded-md shadow-none">
          <CardContent>
            <div className="grid grid-cols-1 items-center gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
              <ResponsiveItem
                name="Account Provider"
                description="The service this account belongs to"
                icon={<AtSignIcon className="size-4" />}
                iconClassName="u-hue-blue"
              >
                {account.providerId}
              </ResponsiveItem>

              <ResponsiveItem
                name="Account Created"
                description="When this account was first connected"
                icon={<CalendarDays className="size-4" />}
                iconClassName="u-hue-violet"
              >
                <DateTime date={account.createdAt} />
              </ResponsiveItem>

              <ResponsiveItem
                name="Last Synced"
                description="Most recent sign-in or token refresh"
                icon={<Clock className="size-4" />}
                iconClassName="u-hue-orange"
              >
                <DateTime date={account.updatedAt} />
              </ResponsiveItem>

              <ResponsiveItem
                name="Access Token Expires"
                description="Access token valid until this date"
                icon={<Clock className="size-4" />}
                iconClassName="u-hue-red"
              >
                <DateTime date={account.accessTokenExpiresAt} />
              </ResponsiveItem>

              <ResponsiveItem
                name="Refresh Token Expires"
                description="Refresh token valid until this date"
                icon={<Clock className="size-4" />}
                iconClassName="u-hue-red"
              >
                <DateTime date={account.refreshTokenExpiresAt} />
              </ResponsiveItem>
            </div>
          </CardContent>
        </Card>
      );
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <span />
        <Typography.Header3>Active Accounts</Typography.Header3>
        <ReloadButton onClick={refetch} isLoading={isFetching} />
      </div>
      <ErrorMessage error={error} retry={refetch} isFetching={isFetching} />
      {getContent()}
    </div>
  );
};

export default UserAccounts;
