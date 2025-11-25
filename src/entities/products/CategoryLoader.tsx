import React from 'react';

import { Spinner } from '@/components/ui';
import type { ICategories } from '@/models';

import { Category } from '.';

interface CategoryLoaderProps {
  dataCategories: ICategories | undefined;
  categoryId: number | undefined;
}

const CategoryLoader: React.FC<CategoryLoaderProps> = ({
  dataCategories,
  categoryId,
}) => {
  const category = dataCategories?.find(
    (item) => item.categoryId === categoryId,
  );

  if (!category) {
    return (
      <span
        className="inline-flex items-center gap-2 text-muted-foreground"
        title="Product category"
      >
        {categoryId}
        <Spinner />
      </span>
    );
  }

  return <Category category={category} />;
};

export default CategoryLoader;
