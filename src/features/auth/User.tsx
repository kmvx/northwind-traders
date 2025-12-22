'use client';

import { useQuery } from '@tanstack/react-query';

import { ErrorMessage, WaitSpinner } from '@/ui';

import { authClient, toErrorAuth, UserDetails } from '.';

interface UserProps {
  userId: string;
}

const User: React.FC<UserProps> = ({ userId }) => {
  const { data: session } = authClient.useSession();

  const {
    data: dataUser,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ['auth.getUser', userId],
    queryFn: async () => {
      const response = await authClient.admin.getUser({
        query: { id: userId },
      });
      if (response.error) {
        throw toErrorAuth(response.error);
      }
      return response;
    },
  });

  const getContent = () => {
    if (isLoading) return <WaitSpinner />;

    const user = dataUser?.data;
    if (!user) return null;
    return (
      <UserDetails user={user} currentSessionId={session?.session.id ?? ''} />
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <ErrorMessage error={error} retry={refetch} isFetching={isFetching} />
      {getContent()}
    </div>
  );
};

export default User;
