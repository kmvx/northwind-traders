import { useQuery } from '@tanstack/react-query';
import { MapPinIcon } from 'lucide-react';

import { Spinner } from '@/components/ui';
import { ResponsiveItem } from '@/ui';

interface IPLocationProps {
  ipAddress: string | null;
}

const IPLocation: React.FC<IPLocationProps> = ({ ipAddress }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['ip', ipAddress],
    queryFn: async () => await fetchLocation(ipAddress),
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

interface LocationData {
  city: string;
  country_name: string;
}

const fetchLocation = async (ipAddress: string | null) => {
  if (!ipAddress) return null;

  const response = await fetch(
    `https://ipapi.co/${ipAddress === '127.0.0.1' ? '' : ipAddress}/json/`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch location data');
  }

  return (await response.json()) as LocationData;
};

export default IPLocation;
