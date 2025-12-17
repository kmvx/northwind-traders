'use client';

import Link from 'next/link';
import { useCallback } from 'react';

import { Badge, Card, CardContent } from '@/components/ui';
import { useAsync } from '@/hooks';
import {
  DateTime,
  ErrorMessage,
  PanelStretched,
  ReloadButton,
  ResponsiveGrid,
  Typography,
  WaitSpinner,
} from '@/ui';

import { authClient, toErrorAuth, UserAvatar } from '../auth';
import { AdminCheckbox, isAdminUser } from '.';

const Admin: React.FC = () => {
  const {
    data: session,
    isPending: isPendingSession,
    error: errorSession,
    refetch: refetchSession,
  } = authClient.useSession();

  const listUsers = useCallback(async () => {
    // NOTE: Shows only first 100 users, must use pagination
    return await authClient.admin.listUsers({ query: {} });
  }, []);

  const {
    data: dataUsers,
    isLoading: isLoadingUsers,
    error: errorUsers,
    execute: executeUsers,
  } = useAsync({
    asyncFn: listUsers,
  });

  const error = errorSession || errorUsers || toErrorAuth(dataUsers?.error);
  const isLoading = isPendingSession || isLoadingUsers;
  const refetch = useCallback(() => {
    refetchSession();
    executeUsers();
  }, [refetchSession, executeUsers]);

  const getContent = () => {
    if (error) return <ErrorMessage error={error} retry={refetch} />;
    const users = dataUsers?.data;
    if (!users && isLoading) return <WaitSpinner />;
    if (!isAdminUser(session?.user)) {
      return <ErrorMessage error={new Error('No access')} retry={refetch} />;
    }
    if (!users) return null;

    const currentUserId = session?.user.id;

    return (
      <ResponsiveGrid minWidth="18rem">
        {users.users.map((user) => {
          const href = `/auth/admin/users/${user.id}`;
          const isAdmin = isAdminUser(user);
          return (
            <Card className="rounded-md shadow-none" key={user.id}>
              <CardContent>
                <div className="flex gap-4">
                  <Link href={href}>
                    <UserAvatar image={user.image} />
                  </Link>
                  <div className="flex flex-grow flex-col gap-4">
                    <Link href={href}>
                      <div className="flex justify-between gap-4">
                        <span>{user.email}</span>
                        <div className="flex gap-2">
                          {user.id === currentUserId && <Badge>You</Badge>}
                          {isAdmin && <Badge>Admin</Badge>}
                        </div>
                      </div>
                    </Link>
                    <span className="text-muted-foreground text-xs">
                      {user.name}, {user.role},{' '}
                      <DateTime
                        date={user.createdAt}
                        className="text-muted-foreground text-xs"
                      />
                    </span>
                    {currentUserId !== user.id && (
                      <AdminCheckbox userId={user.id} isAdmin={isAdmin} />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </ResponsiveGrid>
    );
  };

  return (
    <PanelStretched className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <span />
        <Typography variant="header1">Users</Typography>
        <ReloadButton onClick={refetch} isLoading={isLoading} />
      </div>
      {getContent()}
    </PanelStretched>
  );
};

export default Admin;
