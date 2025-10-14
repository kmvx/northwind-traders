import React from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type BasicTooltipProps = {
  children: React.ReactNode;
  title: React.ReactNode;
  delayDuration?: number;
};

const BasicTooltip: React.FC<BasicTooltipProps> = ({
  title,
  children,
  delayDuration = 700,
}) => {
  return (
    <Tooltip delayDuration={delayDuration}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      {title && (
        <TooltipContent side="bottom" align="start">
          {title}
        </TooltipContent>
      )}
    </Tooltip>
  );
};

export default BasicTooltip;
