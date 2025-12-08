import { useQuery } from '@tanstack/react-query';
import { MapPinIcon } from 'lucide-react';

import { Spinner } from '@/components/ui';
import { ResponsiveItem } from '@/ui';
import { fetchInfoByIPAddress } from '@/utils';

interface IPLocationProps {
  ipAddress: string | null;
}

const IPLocation: React.FC<IPLocationProps> = ({ ipAddress }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['ip', ipAddress],
    queryFn: async () => await fetchInfoByIPAddress(ipAddress),
    enabled: Boolean(ipAddress),
  });

  if (isLoading)
    return (
      <div className="flex w-30 justify-center">
        <Spinner />
      </div>
    );
  if (!ipAddress || !data) return null;

  return (
    <ResponsiveItem
      name="Location"
      description="Your location"
      icon={<MapPinIcon className="size-4" />}
      iconClassName="u-hue-green"
    >
      {data.city}, {data.country_name}
    </ResponsiveItem>
  );
};

export default IPLocation;
