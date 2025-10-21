'use client';

import Link from 'next/link';

import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const BasicLink: React.FC<ButtonLinkProps> = ({
  href,
  children,
  className,
}) => {
  return (
    <Button
      asChild
      variant="link"
      className={cn('p-0 h-auto text-blue-600', className)}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

export default BasicLink;
