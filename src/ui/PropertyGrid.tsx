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
    <div className="grid grid-cols-1 2xl:grid-cols-2 items-center gap-y-2 gap-x-8">
      {items.map((item) => (
        <Item item={item} key={item.name} />
      ))}
    </div>
  );
}

function Item({ item }: { item: PropertyGridItemType }) {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-4">
      <div>
        <div>{item.name}:</div>
        {item.description && (
          <div className="text-xs text-muted-foreground indent-4">
            {item.description}
          </div>
        )}
      </div>
      <b className="text-end grow">{item.value}</b>
    </div>
  );
}
