import type { ICategory } from '@/models';
import { BasicLink } from '@/ui';

import { getEmojiiByCategoryName } from '.';

interface CategoryProps {
  category: ICategory | null;
  isLink: boolean;
}

const Category: React.FC<CategoryProps> = ({ category, isLink }) => {
  const getContent = () => {
    return <span>{category ? category.categoryName : 'All categories'}</span>;
  };

  return (
    <div
      className="flex items-center -mb-1"
      title={`${category ? category.description : 'Any product category'} (product category)`}
    >
      <span className="mb-1">
        {category ? getEmojiiByCategoryName(category.categoryName) : '📦'}
      </span>
      &nbsp;&nbsp;
      {isLink ? (
        <BasicLink href={`/products/?categoryId=${category?.categoryId}`}>
          {getContent()}
        </BasicLink>
      ) : (
        getContent()
      )}
    </div>
  );
};

export default Category;
