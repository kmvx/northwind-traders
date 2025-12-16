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
  const user = data?.user;

  if (error) return <ErrorMessage error={error} retry={refetch} />;
  if (isPending) return <WaitSpinner />;
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

export default UserCurrent;
