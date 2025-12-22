'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { ErrorMessage, WaitSpinner } from '@/ui';

import { authClient, LoginButton, UserDetails } from '.';

const UserCurrent: React.FC = () => {
  // Logout
  const router = useRouter();
  const onLogout = useCallback(async () => {
    await authClient.signOut();
    router.push('/');
  }, [router]);

  // Session info
  const { data, isPending, error, refetch } = authClient.useSession();

  const getContent = () => {
    if (isPending) return <WaitSpinner />;

    const user = data?.user;
    if (!user) {
      return (
        <div className="flex h-full items-center justify-center">
          <LoginButton />
        </div>
      );
    }
    return (
      <UserDetails
        user={user}
        currentSessionId={data.session.id}
        onLogout={onLogout}
      />
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <ErrorMessage error={error} retry={refetch} isFetching={isPending} />
      {getContent()}
    </div>
  );
};

export default UserCurrent;
