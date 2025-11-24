import Link from 'next/link';
import React, { memo } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import type { ICategories, IProduct, IProducts } from '@/models';
import { useQueryCategories } from '@/net';
import { Pagination, ResponsiveGrid } from '@/ui';
import { formatCurrency } from '@/utils';

import { CategoryName } from '.';

interface ProductsCardsProps {
  data: IProducts;
  extraNodes?: React.ReactNode;
}

const ProductsCards: React.FC<ProductsCardsProps> = ({ data, extraNodes }) => {
  const { data: dataCategories } = useQueryCategories();
  return (
    <Pagination
      data={data}
      defaultLimit={20}
      renderPage={(items) => (
        <ResponsiveGrid minWidth="18rem">
          {items.map((item) => (
            <ProductCard
              item={item}
              dataCategories={dataCategories}
              key={item.productId}
            />
          ))}
        </ResponsiveGrid>
      )}
      extraNodes={extraNodes}
    />
  );
};

interface ProductCardProps {
  item: IProduct;
  dataCategories: ICategories | undefined;
}

const ProductCard: React.FC<ProductCardProps> = memo(function ProductCard({
  item,
  dataCategories,
}) {
  return (
    <Link href={`/products/${item.productId}`} className="block">
      <Card className="hover:shadow-lg transition h-full">
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between">
              <div title="Product name">{item.productName}</div>
              <CategoryName
                dataCategories={dataCategories}
                categoryId={item.categoryId}
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-full flex flex-col justify-end gap-2">
          <div className="flex flex-wrap justify-between items-baseline">
            <span title="Unit price">{formatCurrency(item.unitPrice)}</span>
            <span
              className="text-red-600"
              title="This product was discontinued"
            >
              {item.discontinued && 'Discontinued'}
            </span>
            <span
              title="Quantity per unit"
              className="text-muted-foreground text-sm"
            >
              {item.quantityPerUnit}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
});

export default ProductsCards;
