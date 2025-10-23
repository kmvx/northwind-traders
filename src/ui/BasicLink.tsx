'use client';

import Link from 'next/link';
import { forwardRef } from 'react';

import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface BasicLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const BasicLink = forwardRef<HTMLAnchorElement, BasicLinkProps>(
  function BasicLink({ href, children, className, ...props }, ref) {
    return (
      <Button
        asChild
        variant="link"
        className={cn('p-0 h-auto text-blue-600', className)}
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
