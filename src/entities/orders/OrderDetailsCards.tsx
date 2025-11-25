import React from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Spinner,
} from '@/components/ui';
import type { ICategories, IOrderDetails, IProducts } from '@/models';
import { BasicLink, ResponsiveGrid } from '@/ui';
import { formatCurrency } from '@/utils';

import { CategoryLoader } from '../products';
import { OrderHoverCard } from '.';
import { getTotalCost } from './utilsOrders';

interface OrderDetailsCardsProps {
  data: IOrderDetails;
  dataProducts: IProducts | undefined;
  dataCategories: ICategories | undefined;
  showProduct: boolean;
}

const OrderDetailsCards: React.FC<OrderDetailsCardsProps> = ({
  data,
  dataProducts,
  dataCategories,
  showProduct,
}) => {
  return (
    <ResponsiveGrid minWidth="15rem">
      {data.map((orderDetail, index) => {
        const product = dataProducts?.find(
          (product) => product.productId === orderDetail.productId,
        );

        return (
          <Card className="hover:shadow-lg transition h-full" key={index}>
            <CardHeader>
              <CardTitle>
                <div className="flex justify-between">
                  {showProduct ? (
                    <>
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
                      <CategoryLoader
                        dataCategories={dataCategories}
                        categoryId={product?.categoryId}
                      />
                    </>
                  ) : (
                    <OrderHoverCard orderId={orderDetail.orderId} />
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              <div
                className="text-end text-sm"
                title="Price * Quantity - Discont = Cost"
              >
                {formatCurrency(orderDetail.unitPrice)} * {orderDetail.quantity}{' '}
                units{' '}
                {orderDetail.discount
                  ? ` - ${orderDetail.discount * 100}% `
                  : ''}{' '}
                = <b>{formatCurrency(getTotalCost(orderDetail))}</b>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </ResponsiveGrid>
  );
};

export default OrderDetailsCards;
