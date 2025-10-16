'use client';

import React from 'react';

import { Button } from '@/components/ui';

import { BasicTooltip } from '.';

interface ButtonWithTooltipProps extends React.ComponentProps<typeof Button> {
  title?: string;
}

const ButtonWithTooltip = React.forwardRef<
  HTMLButtonElement,
  ButtonWithTooltipProps
>(function ButtonWithTooltip({ title, children, ...props }, ref) {
  return (
    <BasicTooltip title={title}>
      <Button {...props} ref={ref}>
        {children}
      </Button>
    </BasicTooltip>
  );
});

export default ButtonWithTooltip;
