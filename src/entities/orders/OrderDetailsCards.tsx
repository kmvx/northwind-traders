import React, { memo } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Spinner,
} from '@/components/ui';
import type {
  ICategories,
  IOrderDetail,
  IOrderDetails,
  IProducts,
  ISuppliers,
} from '@/models';
import { BasicLink, Pagination, ResponsiveGrid } from '@/ui';
import { formatCurrency } from '@/utils';

import { Category } from '../products';
import { SupplierPreview } from '../suppliers';
import { OrderHoverCard } from '.';
import { getTotalCost } from './utilsOrders';

interface OrderDetailsCardsProps {
  data: IOrderDetails;
  dataProducts: IProducts | undefined;
  dataCategories: ICategories | undefined;
  dataSuppliers: ISuppliers | undefined;
  showProduct: boolean;
  extraNodesAfter?: React.ReactNode;
}

const OrderDetailsCards: React.FC<OrderDetailsCardsProps> = ({
  data,
  dataProducts,
  dataCategories,
  dataSuppliers,
  showProduct,
  extraNodesAfter,
}) => {
  return (
    <Pagination
      suffix="OrderDetails"
      data={data}
      extraNodesAfter={extraNodesAfter}
      renderPage={(items) => (
        <ResponsiveGrid minWidth="17rem">
          {items.map((item, index) => (
            <OrderDetailCard
              item={item}
              dataProducts={dataProducts}
              dataCategories={dataCategories}
              dataSuppliers={dataSuppliers}
              showProduct={showProduct}
              key={index}
            />
          ))}
        </ResponsiveGrid>
      )}
    />
  );
};

interface OrderDetailCardProps {
  item: IOrderDetail;
  dataProducts: IProducts | undefined;
  dataCategories: ICategories | undefined;
  dataSuppliers: ISuppliers | undefined;
  showProduct: boolean;
}

const OrderDetailCard: React.FC<OrderDetailCardProps> = memo(
  function OrderCard({
    item,
    dataProducts,
    dataCategories,
    dataSuppliers,
    showProduct,
  }) {
    const product = dataProducts?.find(
      (product) => product.productId === item.productId,
    );

    return (
      <Card className="h-full rounded-md shadow-none transition hover:shadow-lg">
        <CardHeader>
          <CardTitle>
            <div className="flex flex-wrap items-center justify-between gap-2">
              {showProduct ? (
                <>
                  <BasicLink
                    href={`/products/${item.productId}`}
                    title="Product name"
                  >
                    {product ? (
                      product.productName
                    ) : (
                      <span className="flex items-center gap-2">
                        {item.productId}
                        <Spinner />
                      </span>
                    )}
                  </BasicLink>
                  <Category
                    dataCategories={dataCategories}
                    categoryId={product?.categoryId}
                  />
                </>
              ) : (
                <OrderHoverCard orderId={item.orderId} />
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex h-full flex-col items-center justify-between gap-4">
          {showProduct && product && (
            <SupplierPreview
              dataSuppliers={dataSuppliers}
              supplierId={product.supplierId}
            />
          )}
          <div
            className="text-end text-sm"
            title="Price * Quantity - Discont = Cost"
          >
            {formatCurrency(item.unitPrice)} * {item.quantity} units{' '}
            {item.discount ? ` - ${item.discount * 100}% ` : ''} ={' '}
            <b>{formatCurrency(getTotalCost(item))}</b>
          </div>
        </CardContent>
      </Card>
    );
  },
);

export default OrderDetailsCards;
