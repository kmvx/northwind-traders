import Link from 'next/link';
import { memo } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import type { IProduct, IProducts } from '@/models';
import { ResponsiveGrid } from '@/ui';

export default function ProductsCards({ items }: { items: IProducts }) {
  return (
    <ResponsiveGrid minWidth="18rem">
      {items.map((item) => (
        <ProductCard item={item} key={item.productId} />
      ))}
    </ResponsiveGrid>
  );
}

const ProductCard = memo(function ProductCard({ item }: { item: IProduct }) {
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
