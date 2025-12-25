'use client';

import { useQuery } from '@tanstack/react-query';
import { GlobeIcon, MapPinIcon } from 'lucide-react';
import type React from 'react';

import { Spinner } from '@/components/ui';
import { ResponsiveItem } from '@/ui';
import { fetchInfoByIPAddress } from '@/utils';

interface IPAddressProps {
  // undefined - current IP address
  ipAddress?: string | null | undefined;
}

const IPAddress: React.FC<IPAddressProps> = ({ ipAddress }) => {
  // Fetch info by IP
  const { data, isLoading } = useQuery({
    queryKey: ['ip', ipAddress],
    queryFn: async () => await fetchInfoByIPAddress(ipAddress),
    enabled: ipAddress !== null,
  });

  const getLoadingComponent = () => (
    <div className="flex w-30 justify-center">
      <Spinner />
    </div>
  );

  const getIPAddress = () => {
    if (isLoading) getLoadingComponent();
    const ip = data?.ip ?? ipAddress;
    if (!ip) return null;

    return (
      <ResponsiveItem
        name="IP Address"
        description="Public IP address as seen by external servers"
        icon={<GlobeIcon className="size-4" />}
        iconClassName="u-hue-blue"
      >
        <code className="font-mono">{ip.replace(/:/g, ':\u200B')}</code>
      </ResponsiveItem>
    );
  };

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
        description="Organization or ISP"
        icon={<MapPinIcon className="size-4" />}
        iconClassName="u-hue-yellow"
      >
        {data.org}
      </ResponsiveItem>
    );
  };

  return (
    <>
      {getIPAddress()}
      {getLocation()}
      {getProvider()}
    </>
  );
};

export default IPAddress;
