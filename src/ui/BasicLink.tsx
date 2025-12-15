'use client';

import Link from 'next/link';
import React, { forwardRef } from 'react';

import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface BasicLinkProps extends React.ComponentProps<typeof Button> {
  href: string;
  children: React.ReactNode;
  className?: string | undefined;
}

const BasicLink = forwardRef<HTMLAnchorElement, BasicLinkProps>(
  function BasicLink({ href, children, className, ...props }, ref) {
    return (
      <Button
        asChild
        variant="link"
        className={cn(
          'h-auto p-0',
          !props.variant && 'text-blue-600 dark:text-blue-300',
          className,
        )}
        {...props}
      >
        <Link href={href} ref={ref}>
          {children}
        </Link>
      </Button>
    );
  },
);

export default BasicLink;
