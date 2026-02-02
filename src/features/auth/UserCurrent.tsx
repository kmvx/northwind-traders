'use client';

import { ErrorMessage, WaitSpinner } from '@/ui';

import { authClient, LoginButton, UserDetails } from '.';

const UserCurrent: React.FC = () => {
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
        isCurrentUser
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
