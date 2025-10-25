import { cn } from '@/lib/utils';

type PropertyGridItemType = {
  name: string;
  description?: string;
  value: React.ReactNode;
};

interface PropertyGridProps {
  items: PropertyGridItemType[];
}

export default function PropertyGrid({ items }: PropertyGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 items-center gap-y-2 gap-x-8',
        items.length > 1 && '2xl:grid-cols-2',
      )}
    >
      {items.map((item) => (
        <Item item={item} key={item.name} />
      ))}
    </div>
  );
}

function Item({ item }: { item: PropertyGridItemType }) {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-4">
      <div className="">
        <div>{item.name}:</div>
        {item.description && (
          <div className="text-xs text-muted-foreground indent-4">
            {item.description}
          </div>
        )}
      </div>
      <div className="grow flex items-center justify-end">
        {typeof item.value === 'string' || typeof item.value === 'number' ? (
          <span className="text-end font-bold">{item.value}</span>
        ) : (
          item.value
        )}
      </div>
    </div>
  );
}
