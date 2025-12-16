'use client';

import { useCallback } from 'react';

import { useAsync } from '@/hooks';
import { ErrorMessage, WaitSpinner } from '@/ui';

import { authClient, toErrorAuth, UserDetails } from '.';

interface UserProps {
  userId: string;
}

const User: React.FC<UserProps> = ({ userId }) => {
  const { data: session } = authClient.useSession();

  const getUser = useCallback(async () => {
    return await authClient.admin.getUser({ query: { id: userId } });
  }, [userId]);

  const {
    data: dataUser,
    isLoading,
    error: errorUser,
    execute,
  } = useAsync({
    asyncFn: getUser,
  });

  const error = errorUser || toErrorAuth(dataUser?.error);

  if (error) return <ErrorMessage error={error} retry={execute} />;
  if (isLoading) return <WaitSpinner />;

  const user = dataUser?.data;
  if (!user) return null;

  return (
    <UserDetails user={user} currentSessionId={session?.session.id ?? ''} />
  );
};

export default User;
