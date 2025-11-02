import React from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Spinner,
} from '@/components/ui';
import type { IOrderDetails, IProducts } from '@/models';
import { BasicLink, ResponsiveGrid } from '@/ui';

import { getTotalCost, roundMoney } from './utils';

interface OrderDetailsCardsProps {
  data: IOrderDetails;
  dataProducts: IProducts | undefined;
}

const OrderDetailsCards: React.FC<OrderDetailsCardsProps> = ({
  data,
  dataProducts,
}) => {
  return (
    <ResponsiveGrid minWidth="15rem">
      {data.map((orderDetail) => {
        const product = dataProducts?.find(
          (product) => product.productId === orderDetail.productId,
        );

        return (
          <Card key={orderDetail.productId}>
            <CardHeader>
              <CardTitle>
                <BasicLink
                  href={`/products/${orderDetail.productId}`}
                  title="Product"
                >
                  {product ? (
                    product.productName
                  ) : (
                    <span className="flex items-center gap-2">
                      {orderDetail.productId}
                      <Spinner />
                    </span>
                  )}
                </BasicLink>
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              <div className="text-end text-sm">
                ${orderDetail.unitPrice} * {orderDetail.quantity} units{' '}
                {orderDetail.discount
                  ? ` - ${orderDetail.discount * 100}% `
                  : ''}{' '}
                = <b>${roundMoney(getTotalCost(orderDetail))}</b>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </ResponsiveGrid>
  );
};

export default OrderDetailsCards;
