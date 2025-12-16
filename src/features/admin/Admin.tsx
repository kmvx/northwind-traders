'use client';

import Link from 'next/link';
import { useCallback } from 'react';

import { Badge, Card, CardContent } from '@/components/ui';
import { useAsync } from '@/hooks';
import {
  DateTime,
  ErrorMessage,
  PanelStretched,
  ResponsiveGrid,
  Typography,
  WaitSpinner,
} from '@/ui';

import { authClient, toErrorAuth, UserAvatar } from '../auth';
import { isAdmin } from '.';

const Admin: React.FC = () => {
  const {
    data: session,
    isPending,
    error: errorSession,
    refetch,
  } = authClient.useSession();

  const listUsers = useCallback(async () => {
    return await authClient.admin.listUsers({ query: {} });
  }, []);

  const {
    data: dataUsers,
    isLoading: isLoadingUsers,
    error: errorUsers,
  } = useAsync({
    asyncFn: listUsers,
  });

  const error = errorSession || errorUsers || toErrorAuth(dataUsers?.error);
  const isLoading = isPending || isLoadingUsers;

  const getContent = () => {
    if (error) return <ErrorMessage error={error} retry={refetch} />;
    if (isLoading) return <WaitSpinner />;
    if (!isAdmin(session?.user)) {
      return <ErrorMessage error={new Error('No access')} retry={refetch} />;
    }
    if (!dataUsers?.data) return null;

    return (
      <ResponsiveGrid minWidth="18rem">
        {dataUsers.data.users.map((user) => (
          <Link href={`/auth/admin/users/${user.id}`} key={user.id}>
            <Card className="rounded-md shadow-none">
              <CardContent>
                <div className="flex gap-4">
                  <UserAvatar image={user.image} />
                  <div className="flex flex-grow flex-col gap-2">
                    <div className="flex justify-between gap-2">
                      <span>{user.email}</span>
                      {user.id === session?.user.id && <Badge>You</Badge>}
                      {isAdmin(user) && <Badge>Admin</Badge>}
                    </div>
                    <span className="text-muted-foreground text-xs">
                      {user.name}, {user.role},{' '}
                      <DateTime
                        date={user.createdAt}
                        className="text-muted-foreground text-xs"
                      />
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </ResponsiveGrid>
    );
  };

  return (
    <PanelStretched className="flex flex-col gap-4">
      <Typography variant="header1">Users</Typography>
      {getContent()}
    </PanelStretched>
  );
};

export default Admin;
