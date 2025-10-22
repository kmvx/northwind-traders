import { Fragment } from 'react';

type ProPropertyGridItemType = {
  name: string;
  description?: string;
  value: React.ReactNode;
};

interface PropertyGridProps {
  items: ProPropertyGridItemType[];
}

export default function PropertyGrid({ items }: PropertyGridProps) {
  return (
    <div className="grid grid-cols-2 2xl:grid-cols-4 items-center gap-y-2 gap-x-8">
      {items.map(({ name, description, value }) => (
        <Fragment key={name}>
          <div>
            <div>{name}:</div>
            <div className="text-xs text-muted-foreground indent-4">
              {description}
            </div>
          </div>
          <b className="text-end">{value}</b>
        </Fragment>
      ))}
    </div>
  );
}
