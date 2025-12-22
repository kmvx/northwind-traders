'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useCallback } from 'react';

import { Badge, Card, CardContent } from '@/components/ui';
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
import { AdminCheckbox, isAdminUser, QUERY_KEY_ADMIN_USERS } from '.';

const Admin: React.FC = () => {
  const {
    data: session,
    isPending: isPendingSession,
    error: errorSession,
    refetch: refetchSession,
  } = authClient.useSession();

  // Fetch list of users
  const {
    data: dataUsers,
    isLoading: isLoadingUsers,
    isFetching: isFetchingUsers,
    error: errorUsers,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: [QUERY_KEY_ADMIN_USERS],
    queryFn: async () => {
      // BUG: Shows only first 100 users, must use pagination
      const response = await authClient.admin.listUsers({ query: {} });
      if (response.error) {
        throw toErrorAuth(response.error);
      }
      return response.data;
    },
  });

  const error = errorSession || errorUsers;
  const isLoading = isPendingSession || isLoadingUsers;
  const refetch = useCallback(() => {
    refetchSession();
    refetchUsers();
  }, [refetchSession, refetchUsers]);

  const getContent = () => {
    if (!dataUsers) return isLoading ? <WaitSpinner /> : null;
    if (!isAdminUser(session?.user)) {
      return <ErrorMessage error={new Error('No access')} retry={refetch} />;
    }

    const currentUserId = session?.user.id;

    return (
      <ResponsiveGrid minWidth="18rem">
        {dataUsers.users.map((user) => {
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
        <ReloadButton onClick={refetch} isLoading={isFetchingUsers} />
      </div>
      <ErrorMessage error={error} retry={refetch} isFetching={isLoading} />
      {getContent()}
    </PanelStretched>
  );
};

export default Admin;
