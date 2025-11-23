import { Fragment } from 'react/jsx-runtime';

import { Separator } from '@/components/ui';

interface ResponsiveItemsProps {
  items: ({ name: string; value: React.ReactNode } | undefined)[];
}

const ResponsiveItems: React.FC<ResponsiveItemsProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
      {items.map((item, index) =>
        item ? (
          <Fragment key={item.name}>
            <div className="text-muted-foreground">{item.name}</div>
            <div className="text-end">{item.value}</div>
          </Fragment>
        ) : (
          <Separator className="col-span-2 my-2" key={index} />
        ),
      )}
    </div>
  );
};

export default ResponsiveItems;
