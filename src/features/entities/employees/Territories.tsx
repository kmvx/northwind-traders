'use client';

import { Globe2Icon } from 'lucide-react';
import React from 'react';

import { useEmployeeTeritories, useQueryRegions } from '@/net';
import { ErrorMessage, WaitSpinner } from '@/ui';

const Territories: React.FC<{ employeeId?: string }> = ({ employeeId }) => {
  const { data, error, isLoading, refetch } = useEmployeeTeritories({
    employeeId,
  });
  const { data: dataRegions } = useQueryRegions();

  if (error) return <ErrorMessage error={error} retry={refetch} />;
  if (isLoading) return <WaitSpinner />;
  if (!data) return <div>No data</div>;

  const regionsMap = new Map<number, string>();
  dataRegions?.forEach((region) =>
    regionsMap.set(region.regionId, region.regionDescription),
  );

  return (
    <div className="flex items-center flex-wrap my-2">
      <Globe2Icon className="size-4 text-muted-foreground me-2" />
      {data.map((item, i) => (
        <React.Fragment key={item.territoryId}>
          {i > 0 && <span>,&nbsp;</span>}
          <b
            title={`Index: ${item.territoryId}\nRegion: ${
              regionsMap.get(item.regionId) || item.regionId
            }`}
          >
            {item.territoryDescription}
          </b>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Territories;
