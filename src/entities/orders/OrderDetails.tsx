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
  orderId?: number | undefined;
  productId?: number | undefined;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderId, productId }) => {
  const showProduct = orderId != undefined;

  // Network data
  const { data, error, isLoading, refetch } = useQueryOrderDetails({
    orderId,
    productId,
  });
  const { data: dataProducts } = useQueryProducts({
    orderId,
    enabled: showProduct,
  });

  const isWidePage = usePageSize().isWidePage;

  const getContent = () => {
    if (error) return <ErrorMessage error={error} retry={refetch} />;
    if (isLoading && !data) return <WaitSpinner />;
    if (!data) return null;
    if (data.length === 0) return <div>Order details not found</div>;
    const totalMoney = data.reduce((acc, item) => acc + getTotalCost(item), 0);
    return (
      <>
        <span>
          {data.length} order details, <b>${roundMoney(totalMoney)}</b> total.
        </span>
        {isWidePage ? (
          <OrderDetailsTable {...{ data, dataProducts, showProduct }} />
        ) : (
          <OrderDetailsCards {...{ data, dataProducts, showProduct }} />
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
