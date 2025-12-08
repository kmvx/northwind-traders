'use client';

import { useQuery } from '@tanstack/react-query';
import { CalendarDaysIcon, ClockIcon, GlobeIcon } from 'lucide-react';

import { Badge, Card, CardContent } from '@/components/ui';
import {
  DateTime,
  ErrorMessage,
  ReloadButton,
  ResponsiveItem,
  Typography,
  UserAgent,
  WaitSpinner,
} from '@/ui';

import { getUserSessions } from '.';

interface UserSessionsProps {
  sessionId: string;
}

const UserSessions: React.FC<UserSessionsProps> = ({ sessionId }) => {
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
      {sessions.map((session) => {
        return (
          <Card key={session.id} className="rounded-md shadow-none">
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-2">
                  <UserAgent userAgent={session.userAgent} />
                  {session.id === sessionId && <Badge>Current</Badge>}
                </div>

                <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
                  <ResponsiveItem
                    name="Session Created"
                    description="When this session was first established"
                    icon={<CalendarDaysIcon className="size-4" />}
                    iconClassName="u-hue-violet"
                  >
                    <DateTime date={session.createdAt} />
                  </ResponsiveItem>

                  <ResponsiveItem
                    name="Last Updated"
                    description="Last time this session was updated"
                    icon={<ClockIcon className="size-4" />}
                    iconClassName="u-hue-orange"
                  >
                    <DateTime date={session.updatedAt} />
                  </ResponsiveItem>

                  <ResponsiveItem
                    name="Session Expires"
                    description="Automatic logout time if inactive"
                    icon={<ClockIcon className="size-4" />}
                    iconClassName="u-hue-red"
                  >
                    <DateTime date={session.expiresAt} />
                  </ResponsiveItem>

                  <ResponsiveItem
                    name="IP Address"
                    description="Public IP from which the session was created"
                    icon={<GlobeIcon className="size-4" />}
                    iconClassName="u-hue-blue"
                  >
                    <code className="font-mono">{session.ipAddress}</code>
                  </ResponsiveItem>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default UserSessions;
