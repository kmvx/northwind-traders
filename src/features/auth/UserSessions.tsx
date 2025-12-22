'use client';

import { useQuery } from '@tanstack/react-query';

import { ErrorMessage, ReloadButton, Typography, WaitSpinner } from '@/ui';

import { getUserSessions, UserSession } from '.';

interface UserSessionsProps {
  userId: string;
  currentSessionId: string;
}

const UserSessions: React.FC<UserSessionsProps> = ({
  userId,
  currentSessionId,
}) => {
  const { data, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['auth.getUserSessions', userId],
    queryFn: async () => await getUserSessions(userId),
  });

  const getContent = () => {
    if (!data) return isLoading ? <WaitSpinner /> : null;

    const sessions = data.slice().reverse();
    if (sessions.length === 0) return <div>No active sessions</div>;

    return sessions.map((session) => (
      <UserSession
        session={session}
        currentSessionId={currentSessionId}
        key={session.id}
      />
    ));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <span />
        <Typography.Header3>Active Sessions</Typography.Header3>
        <ReloadButton onClick={refetch} isFetching={isFetching} />
      </div>
      <ErrorMessage error={error} retry={refetch} isFetching={isFetching} />
      {getContent()}
    </div>
  );
};

export default UserSessions;
