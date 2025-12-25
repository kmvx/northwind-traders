'use client';

import { useQuery } from '@tanstack/react-query';
import { GlobeIcon, MapPinIcon } from 'lucide-react';
import type React from 'react';

import { Spinner } from '@/components/ui';
import { ResponsiveItem } from '@/ui';
import { fetchInfoByIPAddress } from '@/utils';

interface IPAddressProps {
  ipAddress: string | null;
}

const IPAddress: React.FC<IPAddressProps> = ({ ipAddress }) => {
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
    <>
      <ResponsiveItem
        name="IP Address"
        description="Public IP from which the session was created"
        icon={<GlobeIcon className="size-4" />}
        iconClassName="u-hue-blue"
      >
        <code className="font-mono">{ipAddress?.replace(/:/g, ':\u200B')}</code>
      </ResponsiveItem>

      {getLocation()}
      {getProvider()}
    </>
  );
};

export default IPAddress;
