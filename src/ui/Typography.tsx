import { cva, type VariantProps } from 'class-variance-authority';
import React, { type JSX } from 'react';

import { cn } from '@/lib/utils';

const typographyVariants = cva('', {
  variants: {
    variant: {
      default: '',
      header1: 'text-center text-4xl font-bold',
      header2: 'text-center text-3xl font-bold',
      header3: 'text-center text-2xl font-bold',
      muted: 'text-muted-foreground text-xs',
      error: 'text-destructive',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const tagMap = {
  header1: 'h1',
  header2: 'h2',
  header3: 'h3',
  default: 'p',
} as const satisfies Record<string, keyof JSX.IntrinsicElements>;

const isTagMapKey = (key: string): key is keyof typeof tagMap => {
  return key in tagMap;
};

function Typography({
  className,
  variant,
  ...props
}: React.ComponentProps<'h1'> &
  React.ComponentProps<'h2'> &
  React.ComponentProps<'h3'> &
  React.ComponentProps<'p'> &
  VariantProps<typeof typographyVariants>) {
  const Comp = tagMap[variant && isTagMapKey(variant) ? variant : 'default'];

  return (
    <Comp
      className={cn(typographyVariants({ variant, className }))}
      {...props}
    />
  );
}

Typography.variants = {
  DEFAULT: 'default',
  HEADER1: 'header1',
  HEADER2: 'header2',
  HEADER3: 'header3',
  MUTED: 'muted',
  ERROR: 'error',
} as const satisfies Record<
  string,
  VariantProps<typeof typographyVariants>['variant']
>;

type TypographyVariantsType =
  (typeof Typography.variants)[keyof typeof Typography.variants];

Typography.Header1 = function TypographyHeader(
  props: React.ComponentProps<typeof Typography>,
) {
  return <Typography {...props} variant="header1" />;
};

Typography.Header2 = function TypographyHeader(
  props: React.ComponentProps<typeof Typography>,
) {
  return <Typography {...props} variant="header2" />;
};

Typography.Header3 = function TypographyHeader(
  props: React.ComponentProps<typeof Typography>,
) {
  return <Typography {...props} variant="header3" />;
};

Typography.Muted = function TypographyMuted(
  props: React.ComponentProps<typeof Typography>,
) {
  return <Typography {...props} variant="muted" />;
};

Typography.Error = function TypographyError(
  props: React.ComponentProps<typeof Typography>,
) {
  return <Typography {...props} variant="error" />;
};

export { Typography, typographyVariants, type TypographyVariantsType };
