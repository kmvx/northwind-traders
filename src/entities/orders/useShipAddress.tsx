import { useMemo } from 'react';

import type { IAddress, IOrder } from '@/models';

// Memoize order ship address

const useShipAddress = (order: IOrder | undefined): IAddress => {
  const address = useMemo(
    () => ({
      address: order?.shipAddress ?? null,
      city: order?.shipCity ?? null,
      region: order?.shipRegion ?? null,
      postalCode: order?.shipPostalCode ?? null,
      country: order?.shipCountry ?? null,
    }),
    [order],
  );

  return address;
};

export default useShipAddress;
