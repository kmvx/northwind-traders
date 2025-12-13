'use client';

import { useQuery } from '@tanstack/react-query';
import {
  CalendarDaysIcon,
  ClockIcon,
  GlobeIcon,
  MapPinIcon,
} from 'lucide-react';

import { Badge, Card, CardContent, Spinner } from '@/components/ui';
import { DateTime, ResponsiveItem, UserAgent } from '@/ui';
import { fetchInfoByIPAddress } from '@/utils';

import { getUserSessions } from '.';

interface UserSessionProps {
  session: NonNullable<Awaited<ReturnType<typeof getUserSessions>>>[number];
  currentSessionId: string;
}

const UserSession: React.FC<UserSessionProps> = ({
  session,
  currentSessionId,
}) => {
  const ipAddress = session.ipAddress;

  // Fetch info by IP
  const { data, isLoading } = useQuery({
    queryKey: ['ip', ipAddress],
    queryFn: async () => await fetchInfoByIPAddress(ipAddress),
    enabled: Boolean(ipAddress),
  });

  const getLoadingComponent = () => (
    <div className="flex w-30 justify-center">
      <Spinner />
    </div>
  );

  const getLocation = () => {
    if (isLoading) getLoadingComponent();
    if (!data?.country_name) return null;

    return (
      <ResponsiveItem
        name="Location"
        description="Approximate geographic location"
        icon={<MapPinIcon className="size-4" />}
        iconClassName="u-hue-green"
      >
        {[
          ...new Set(
            [data.city, data.region, data.country_name].filter(Boolean),
          ),
        ].join(', ')}
      </ResponsiveItem>
    );
  };

  const getProvider = () => {
    if (isLoading) getLoadingComponent();
    if (!data?.org) return null;

    return (
      <ResponsiveItem
        name="Internet Provider"
        description="Organization or ISP carrying this session"
        icon={<MapPinIcon className="size-4" />}
        iconClassName="u-hue-yellow"
      >
        {data.org}
      </ResponsiveItem>
    );
  };

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
              <code className="font-mono">
                {ipAddress?.replace(/:/g, ':\u200B')}
              </code>
            </ResponsiveItem>

            {getLocation()}
            {getProvider()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserSession;
