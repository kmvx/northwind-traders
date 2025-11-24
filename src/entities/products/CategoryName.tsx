import React from 'react';

import { Spinner } from '@/components/ui';
import type { ICategories } from '@/models';

interface CategoryNameProps {
  dataCategories: ICategories | undefined;
  categoryId: number | undefined;
}

const CategoryName: React.FC<CategoryNameProps> = ({
  dataCategories,
  categoryId,
}) => {
  const category = dataCategories?.find(
    (item) => item.categoryId === categoryId,
  );

  if (category) {
    return (
      <div
        className="flex items-center gap-2 -mb-1"
        title={category.description}
      >
        <span className="mb-1">
          {mapProductCategoryToEmojii[category.categoryName] ?? '❓'}
        </span>
        <span>{category.categoryName}</span>
      </div>
    );
  }

  return (
    <span
      className="inline-flex items-center gap-2 text-muted-foreground"
      title="Product category"
    >
      {categoryId}
      <Spinner />
    </span>
  );
};

const mapProductCategoryToEmojii: Record<string, string> = {
  Beverages: '🥤',
  Condiments: '🌶️',
  Confections: '🍬',
  'Dairy Products': '🧀',
  'Grains/Cereals': '🌽',
  'Meat/Poultry': '🍗',
  Produce: '🍉',
  Seafood: '🐟',
} as const;

export default CategoryName;
