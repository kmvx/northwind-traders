'use client';

import { Globe2Icon } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

import { Spinner } from '@/components/ui';
import { useEmployeeTerritories, useQueryRegions } from '@/net';
import { ErrorMessage } from '@/ui';

interface TerritoriesProps {
  employeeId: number | null;
}

const Territories: React.FC<TerritoriesProps> = ({ employeeId }) => {
  const { data, error, isLoading, refetch } = useEmployeeTerritories({
    employeeId,
  });
  const { data: dataRegions } = useQueryRegions();

  if (error) return <ErrorMessage error={error} retry={refetch} />;
  if (isLoading) return <Spinner />;
  if (!data) return <div>No data</div>;

  const regionsMap = new Map<number, string>();
  dataRegions?.forEach((region) =>
    regionsMap.set(region.regionId, region.regionDescription),
  );

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="u-hue-green rounded-md p-2">
        <Globe2Icon className="size-4 min-w-4" />
      </div>
      {data.map((item, i) => {
        const description = `Index: ${item.territoryId}\nRegion: ${
          regionsMap.get(item.regionId) || item.regionId
        }`;
        return (
          <React.Fragment key={item.territoryId}>
            <b title={description} onClick={() => toast.info(description)}>
              {item.territoryDescription + (i < data.length - 1 ? ',' : '')}
              &nbsp;
            </b>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Territories;
