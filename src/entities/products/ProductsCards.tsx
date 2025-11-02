import Link from 'next/link';
import React, { memo } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import type { IProduct, IProducts } from '@/models';
import { Pagination, ResponsiveGrid } from '@/ui';

interface ProductsCardsProps {
  data: IProducts;
}

const ProductsCards: React.FC<ProductsCardsProps> = ({ data }) => {
  return (
    <Pagination
      data={data}
      defaultLimit={20}
      renderPage={(items) => (
        <ResponsiveGrid minWidth="18rem">
          {items.map((item) => (
            <ProductCard item={item} key={item.productId} />
          ))}
        </ResponsiveGrid>
      )}
    />
  );
};

interface ProductCardProps {
  item: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = memo(function ProductCard({
  item,
}) {
  return (
    <Link href={`/products/${item.productId}`} className="block">
      <Card className="hover:shadow-lg transition h-full">
        <CardHeader>
          <CardTitle title="Product name">{item.productName}</CardTitle>
        </CardHeader>
        <CardContent className="h-full flex flex-col justify-end">
          <div className="text-end" title="Quantity per unit">
            {item.quantityPerUnit}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
});

export default ProductsCards;
