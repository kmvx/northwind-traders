import React, { memo } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import type { ICategories, IProduct, IProducts, ISuppliers } from '@/models';
import { useQueryCategories, useQuerySuppliers } from '@/net';
import { BasicLink, Pagination, ResponsiveGrid } from '@/ui';
import { formatCurrency } from '@/utils';

import { SupplierPreview } from '../suppliers';
import { Category } from '.';

interface ProductsCardsProps {
  data: IProducts;
  extraNodesBefore?: React.ReactNode;
  isSupplierPage: boolean;
}

const ProductsCards: React.FC<ProductsCardsProps> = ({
  data,
  extraNodesBefore,
  isSupplierPage,
}) => {
  const { data: dataCategories } = useQueryCategories();
  const { data: dataSuppliers } = useQuerySuppliers({
    enabled: !isSupplierPage,
  });

  return (
    <Pagination
      suffix="Products"
      data={data}
      extraNodesBefore={extraNodesBefore}
      renderPage={(items) => (
        <ResponsiveGrid minWidth="16rem">
          {items.map((item) => (
            <ProductCard
              item={item}
              dataCategories={dataCategories}
              dataSuppliers={isSupplierPage ? undefined : dataSuppliers}
              key={item.productId}
            />
          ))}
        </ResponsiveGrid>
      )}
    />
  );
};

interface ProductCardProps {
  item: IProduct;
  dataCategories: ICategories | undefined;
  dataSuppliers: ISuppliers | undefined;
}

const ProductCard: React.FC<ProductCardProps> = memo(function ProductCard({
  item,
  dataCategories,
  dataSuppliers,
}) {
  return (
    <Card className="hover:shadow-lg transition h-full">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <BasicLink
              href={`/products/${item.productId}`}
              title="Product name"
            >
              {item.productName}
            </BasicLink>
            <Category
              dataCategories={dataCategories}
              categoryId={item.categoryId}
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full flex flex-col justify-end gap-4">
        {(dataSuppliers || item.discontinued) && (
          <div className="flex flex-wrap justify-between gap-2">
            {dataSuppliers && (
              <SupplierPreview
                dataSuppliers={dataSuppliers}
                supplierId={item.supplierId}
              />
            )}
            {item.discontinued && (
              <span
                className="text-red-600 text-sm"
                title="This product was discontinued"
              >
                Discontinued
              </span>
            )}
          </div>
        )}
        <div className="flex flex-wrap justify-between items-baseline gap-2">
          <span title="Unit price">{formatCurrency(item.unitPrice)}</span>
          <span
            title="Quantity per unit"
            className="text-muted-foreground text-sm"
          >
            {item.quantityPerUnit}
          </span>
        </div>
      </CardContent>
    </Card>
  );
});

export default ProductsCards;
