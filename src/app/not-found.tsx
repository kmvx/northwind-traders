'use client';

import { FileExclamationPointIcon } from 'lucide-react';
import Link from 'next/link';

import { Button, Separator } from '@/components/ui';
import { Typography } from '@/ui';

export default function NotFound() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-8 p-2 text-center text-balance">
      <FileExclamationPointIcon className="size-50" />
      <Separator className="max-w-75" />
      <Typography.Header1>Page Not Found</Typography.Header1>
      <p>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Separator className="max-w-75" />
      <div className="flex gap-4">
        <Button variant="outline">
          <Link href="/">Go Home</Link>
        </Button>
        <Button onClick={() => window.history.back()} variant="outline">
          Go Back
        </Button>
      </div>
    </div>
  );
}
