import React from 'react';

import { Spinner } from '@/components/ui';
import type { ICategories } from '@/models';
import { BasicLink } from '@/ui';

import { getEmojiiByCategoryName } from '.';

interface CategoryProps {
  dataCategories: ICategories | undefined;
  categoryId: number | undefined;
}

const Category: React.FC<CategoryProps> = ({ dataCategories, categoryId }) => {
  const category = dataCategories?.find(
    (item) => item.categoryId === categoryId,
  );

  if (!category) {
    return (
      <span
        className="text-muted-foreground inline-flex items-center gap-2"
        title="Product category"
      >
        {categoryId}
        <Spinner />
      </span>
    );
  }

  return (
    <span
      className="flex items-center"
      title={`${category ? category.description : 'Any product category'} - product category`}
    >
      <span className="mb-1">
        {category ? getEmojiiByCategoryName(category.categoryName) : '📦'}
      </span>
      &nbsp;&nbsp;
      <BasicLink href={`/products/?categoryId=${category?.categoryId}`}>
        {category?.categoryName}
      </BasicLink>
    </span>
  );
};

export default Category;
