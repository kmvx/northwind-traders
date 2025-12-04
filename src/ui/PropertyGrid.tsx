import { cn } from '@/lib/utils';

type PropertyGridItemType = {
  name: string;
  description?: string;
  value: React.ReactNode;
};

interface PropertyGridProps {
  items: PropertyGridItemType[];
}

const PropertyGrid: React.FC<PropertyGridProps> = ({ items }) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 items-center gap-x-8 gap-y-8 sm:gap-y-4',
        items.length > 1 && '2xl:grid-cols-2',
      )}
    >
      {items.map((item) => (
        <Item item={item} key={item.name} />
      ))}
    </div>
  );
};

function Item({ item }: { item: PropertyGridItemType }) {
  return (
    <div className="flex flex-col flex-wrap gap-x-4 gap-y-2 sm:flex-row">
      <div className="">
        <div>{item.name}:</div>
        {item.description && (
          <div className="text-muted-foreground text-xs">
            {item.description}
          </div>
        )}
      </div>
      <div className="flex grow items-center justify-end">
        {typeof item.value === 'string' || typeof item.value === 'number' ? (
          <span className="text-end font-bold">{item.value}</span>
        ) : (
          item.value
        )}
      </div>
    </div>
  );
}

export default PropertyGrid;
