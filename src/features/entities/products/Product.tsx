'use client';

import React, { Fragment } from 'react';

import { useQueryCategories, useQueryProduct } from '@/net';
import { ErrorMessage, PanelCentred, Typography, WaitSpinner } from '@/ui';
import { getCategoryNameById, setDocumentTitle } from '@/utils';

interface ProductProps {
  id: string;
}

const Product: React.FC<ProductProps> = ({ id }) => {
  const { data, error, isLoading, refetch } = useQueryProduct({ id });
  const { data: dataCategories } = useQueryCategories();

  setDocumentTitle(data?.productName, 'Product');

  if (error) return <ErrorMessage error={error} retry={refetch} />;
  if (isLoading) return <WaitSpinner />;
  if (!data) return <div>No data</div>;

  const NoneComponent = data.discontinued ? (
    'None'
  ) : (
    <span className="text-red-600">None</span>
  );

  const items = [
    {
      name: 'Category',
      value: getCategoryNameById(dataCategories, data.categoryId),
      description: 'The category to which the product belongs.',
    },
    {
      name: 'Quantity per unit',
      value: data.quantityPerUnit,
      description: 'Describes how the product is packaged or sold.',
    },
    {
      name: 'Unit price',
      value: '$' + data.unitPrice,
      description: 'The cost per unit of the product.',
    },
    {
      name: 'Units in stock',
      value: data.unitsInStock ? data.unitsInStock : NoneComponent,
      description:
        'The current number of product units available in inventory.',
    },
    {
      name: 'Units on order',
      value: data.unitsOnOrder ? data.unitsOnOrder : NoneComponent,
      description:
        'The number of units ordered from suppliers but not yet received.',
    },
    {
      name: 'Reorder level',
      value: data.reorderLevel ? data.reorderLevel : 'None',
      description: 'The stock level at which the product should be reordered.',
    },
    {
      name: 'Discontinued',
      value: data.discontinued ? (
        <span className="text-red-600">Discontinued</span>
      ) : (
        'Active'
      ),
      description: 'Indicates if the product is discontinued or active.',
    },
  ] as const satisfies {
    name: string;
    description: string;
    value: React.ReactNode;
  }[];

  return (
    <PanelCentred className="flex flex-col gap-4">
      <Typography.Header1>{data.productName}</Typography.Header1>
      <div className="flex flex-col gap-4">
        <div className="text-center">Product</div>

        <div className="grid grid-cols-2 items-center gap-2">
          {items.map(({ name, description, value }) => (
            <Fragment key={name}>
              <div>
                <div>{name}:</div>
                <div className="text-xs text-muted-foreground indent-4">
                  {description}
                </div>
              </div>
              <b className="text-end">{value}</b>
            </Fragment>
          ))}
        </div>
      </div>
    </PanelCentred>
  );
};

export default Product;
