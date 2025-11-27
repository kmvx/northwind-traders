import React from 'react';

import { usePageSize } from '@/hooks';
import {
  useQueryCategories,
  useQueryOrderDetails,
  useQueryProducts,
  useQuerySuppliers,
} from '@/net';
import {
  ErrorMessage,
  PanelCentred,
  PanelStretched,
  Typography,
  WaitSpinner,
} from '@/ui';
import { formatCurrency } from '@/utils';

import { OrderDetailsCards, OrderDetailsTable } from '.';
import { getTotalCost } from './utilsOrders';

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
  const { data: dataCategories } = useQueryCategories({
    enabled: showProduct,
  });
  const { data: dataSuppliers } = useQuerySuppliers({
    enabled: showProduct,
  });

  const isWidePage = usePageSize().isWidePage;

  const getContent = () => {
    if (error) return <ErrorMessage error={error} retry={refetch} />;
    if (isLoading && !data) return <WaitSpinner />;
    if (!data) return null;
    if (data.length === 0) return <div>Order details not found</div>;

    const totalMoney = data.reduce((acc, item) => acc + getTotalCost(item), 0);
    const extraNodesAfter = (
      <span className="mx-2">
        Total cost: <b>{formatCurrency(totalMoney)}</b>
      </span>
    );

    return (
      <>
        {isWidePage ? (
          <OrderDetailsTable
            data={data}
            dataProducts={dataProducts}
            dataCategories={dataCategories}
            dataSuppliers={dataSuppliers}
            showProduct={showProduct}
            extraNodesAfter={extraNodesAfter}
          />
        ) : (
          <OrderDetailsCards
            data={data}
            dataProducts={dataProducts}
            dataCategories={dataCategories}
            dataSuppliers={dataSuppliers}
            showProduct={showProduct}
            extraNodesAfter={extraNodesAfter}
          />
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
