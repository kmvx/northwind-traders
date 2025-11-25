import type { ICategory } from '@/models';

import { getEmojiiByCategoryName } from '.';

interface CategoryProps {
  category: ICategory | null;
}

const Category: React.FC<CategoryProps> = ({ category }) => {
  return (
    <div
      className="flex items-center gap-2 -mb-1"
      title={category ? category.description : 'Any product category'}
    >
      <span className="mb-1">
        {category ? getEmojiiByCategoryName(category.categoryName) : '📦'}
      </span>
      <span>{category ? category.categoryName : 'All categories'}</span>
    </div>
  );
};

export default Category;
