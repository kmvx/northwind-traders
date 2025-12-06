'use client';

import { useQuery } from '@tanstack/react-query';
import {
  CalendarDays,
  CalendarIcon,
  Clock,
  Globe,
  MailIcon,
} from 'lucide-react';

import { Badge, Card, CardContent, Separator } from '@/components/ui';
import {
  DateTime,
  ErrorMessage,
  PanelCentred,
  ReloadButton,
  ResponsiveItem,
  Typography,
  UserAgent,
  WaitSpinner,
} from '@/ui';

import { authClient, getUserInfo, LoginButton, UserAvatar } from '.';

const User: React.FC = () => {
  const { data, isPending, error, refetch } = authClient.useSession();
  const user = data?.user;

  if (error) return <ErrorMessage error={error} retry={refetch} />;
  if (isPending) return <WaitSpinner />;
  if (!user) return <LoginButton />;

  return (
    <PanelCentred className="flex flex-col gap-4">
      <Typography.Header1 className="flex items-center justify-center gap-2">
        <UserAvatar user={user} /> {user.name}
      </Typography.Header1>
      <div className="text-muted-foreground text-center">User (you)</div>
      <div className="flex flex-wrap justify-between gap-x-8 gap-y-2">
        <ResponsiveItem
          name="Email Address"
          description="Your email used for login and notifications"
          icon={<MailIcon />}
          iconClassName="u-hue-yellow"
        >
          {user.email}
        </ResponsiveItem>
        <ResponsiveItem
          name="Member Since"
          description="Date when you created your account"
          icon={<CalendarIcon />}
          iconClassName="u-hue-violet"
        >
          <DateTime date={user.createdAt} />
        </ResponsiveItem>
      </div>
      <Separator />
      <UserDetails sessionId={data.session.id} />
    </PanelCentred>
  );
};

interface UserDetailsProps {
  sessionId: string;
}

const UserDetails: React.FC<UserDetailsProps> = ({ sessionId }) => {
  const { data, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['auth.getUserInfo'],
    queryFn: async () => await getUserInfo(),
  });

  if (error) return <ErrorMessage error={error} retry={refetch} />;
  if (isLoading) return <WaitSpinner />;
  if (!data) return null;

  const sessions = data.sessions.slice().reverse();

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
                    icon={<CalendarDays className="size-4" />}
                    iconClassName="u-hue-violet"
                  >
                    <DateTime date={session.createdAt} />
                  </ResponsiveItem>

                  <ResponsiveItem
                    name="Last Updated"
                    description="Last time this session was updated"
                    icon={<Clock className="size-4" />}
                    iconClassName="u-hue-orange"
                  >
                    <DateTime date={session.updatedAt} />
                  </ResponsiveItem>

                  <ResponsiveItem
                    name="Expires"
                    description="Automatic logout time if inactive"
                    icon={<Clock className="size-4" />}
                    iconClassName="u-hue-red"
                  >
                    <DateTime date={session.expiresAt} />
                  </ResponsiveItem>

                  <ResponsiveItem
                    name="IP Address"
                    description="Public IP from which the session was created"
                    icon={<Globe className="size-4" />}
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

export default User;
