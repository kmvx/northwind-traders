import { Separator } from '@/components/ui';

interface ResponsiveItemsProps {
  items: ({ name: string; value: React.ReactNode } | null)[];
}

const ResponsiveItems: React.FC<ResponsiveItemsProps> = ({ items }) => {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, index) =>
        item ? (
          <div
            className="flex flex-wrap items-center justify-between gap-2"
            key={index}
          >
            <div className="text-muted-foreground">{item.name}</div>
            <div>{item.value}</div>
          </div>
        ) : (
          <Separator key={index} />
        ),
      )}
    </div>
  );
};

export default ResponsiveItems;
