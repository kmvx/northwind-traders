'use client';

import { useQuery } from '@tanstack/react-query';

import { ErrorMessage, ReloadButton, Typography, WaitSpinner } from '@/ui';

import { getUserSessions, UserSession } from '.';

interface UserSessionsProps {
  currentSessionId: string;
}

const UserSessions: React.FC<UserSessionsProps> = ({ currentSessionId }) => {
  const { data, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['auth.getUserSessions'],
    queryFn: async () => await getUserSessions(),
  });

  if (error) return <ErrorMessage error={error} retry={refetch} />;
  if (isLoading) return <WaitSpinner />;
  if (!data) return null;

  const sessions = data.slice().reverse();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <span />
        <Typography.Header3>Active Sessions</Typography.Header3>
        <ReloadButton onClick={refetch} isLoading={isFetching} />
      </div>
      {sessions.map((session) => (
        <UserSession
          session={session}
          currentSessionId={currentSessionId}
          key={session.id}
        />
      ))}
    </div>
  );
};

export default UserSessions;
