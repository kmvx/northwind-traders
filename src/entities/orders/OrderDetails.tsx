import React from 'react';

import { usePageSize } from '@/hooks';
import { useQueryOrderDetails, useQueryProducts } from '@/net';
import {
  ErrorMessage,
  PanelCentred,
  PanelStretched,
  Typography,
  WaitSpinner,
} from '@/ui';

import { OrderDetailsCards, OrderDetailsTable } from '.';
import { getTotalCost, roundMoney } from './utils';

interface OrderDetailsProps {
  orderId: number;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderId }) => {
  // Network data
  const { data, error, isLoading, refetch } = useQueryOrderDetails({
    orderId,
  });
  const { data: dataProducts } = useQueryProducts({
    orderId,
    enabled: orderId != undefined,
  });

  const isWidePage = usePageSize().isWidePage;

  const getContent = () => {
    if (error) return <ErrorMessage error={error} retry={refetch} />;
    //if (isLoading && data?.length === 0) return <WaitSpinner />;
    if (isLoading) return <WaitSpinner />;
    if (!data) return null;
    if (data.length === 0) return <div>Order details not found</div>;
    const totalMoney = data.reduce((acc, item) => acc + getTotalCost(item), 0);
    return (
      <>
        <span>
          {data.length} order details, <b>${roundMoney(totalMoney)}</b> total.
        </span>
        {isWidePage ? (
          <OrderDetailsTable {...{ data, dataProducts }} />
        ) : (
          <OrderDetailsCards {...{ data, dataProducts }} />
        )}
      </>
    );
  };

  const Panel = isWidePage ? PanelCentred : PanelStretched;

  return (
    <Panel className="flex flex-col gap-4">
      <Typography.Header2>Order details</Typography.Header2>
      {getContent()}
    </Panel>
  );
};

export default OrderDetails;
