import { Spinner } from '@/components/ui';
import type { ICategories } from '@/models';

interface CategoryNameProps {
  dataCategories: ICategories | undefined;
  categoryId: number | undefined;
}

export default function CategoryName({
  dataCategories,
  categoryId,
}: CategoryNameProps) {
  const category = dataCategories?.find(
    (item) => item.categoryId === categoryId,
  );

  if (category) return category.categoryName;

  return (
    <span className="inline-flex items-center gap-2">
      {categoryId}
      <Spinner />
    </span>
  );
}
