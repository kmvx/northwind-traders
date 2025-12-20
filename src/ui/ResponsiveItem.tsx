import type React from 'react';
import { toast } from 'sonner';
import invariant from 'tiny-invariant';

import { cn } from '@/lib/utils';

interface ResponsiveItemProps {
  name: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconClassName?: string | undefined;
}

const ResponsiveItem: React.FC<ResponsiveItemProps> = ({
  name,
  description,
  children,
  icon,
  iconClassName,
}) => {
  invariant(Boolean(icon) || !Boolean(iconClassName));

  const onClick = () => toast.info(description);

  return (
    <div title={description} className="flex items-center gap-2">
      {icon && (
        <div className={cn('rounded-md p-2', iconClassName)} onClick={onClick}>
          {icon}
        </div>
      )}
      <div className="flex flex-grow flex-col gap-0.5">
        <div className="text-muted-foreground text-xs" onClick={onClick}>
          {name}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default ResponsiveItem;
