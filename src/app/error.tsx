'use client';

import { useEffect } from 'react';

import { ErrorMessage } from '@/ui';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorMessage error={error} retry={reset} />;
}
