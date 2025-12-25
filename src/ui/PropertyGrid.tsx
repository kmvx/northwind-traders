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
        items.length > 1 && 'xl:grid-cols-2',
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
    <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
      <div className="grow-2 basis-1/3">
        <div>{item.name}:</div>
        {item.description && (
          <div className="text-muted-foreground text-xs">
            {item.description}
          </div>
        )}
      </div>
      <div className="flex grow items-center justify-end">
        {typeof item.value === 'string' || typeof item.value === 'number' ? (
          <span className="text-end font-bold text-balance">{item.value}</span>
        ) : (
          item.value
        )}
      </div>
    </div>
  );
}

export default PropertyGrid;
