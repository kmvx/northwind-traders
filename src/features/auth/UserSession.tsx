'use client';

import { CalendarDaysIcon, ClockIcon, GlobeIcon } from 'lucide-react';

import { Badge, Card, CardContent } from '@/components/ui';
import { DateTime, ResponsiveItem, UserAgent } from '@/ui';

import { getUserSessions, IPLocation } from '.';

interface UserSessionProps {
  session: NonNullable<Awaited<ReturnType<typeof getUserSessions>>>[number];
  currentSessionId: string;
}

const UserSession: React.FC<UserSessionProps> = ({
  session,
  currentSessionId,
}) => {
  return (
    <Card className="rounded-md shadow-none">
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <UserAgent userAgent={session.userAgent} />
            {session.id === currentSessionId && <Badge>Current</Badge>}
          </div>

          <div className="grid grid-cols-1 items-center gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
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

            <IPLocation ipAddress={session.ipAddress} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserSession;
