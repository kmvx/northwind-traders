'use client';

import { useCallback, useEffect, useState } from 'react';

import { normalizeError } from '@/utils';

interface UseAsyncOptions<T> {
  asyncFn: () => Promise<T>; // Must be memoized
  initialData?: T;
}

interface UseAsyncResult<T> {
  data: T | undefined;
  isLoading: boolean;
  error: Error | null;
  execute: () => Promise<void>;
  reset: () => void;
}

export default function useAsync<T>({
  asyncFn,
  initialData,
}: UseAsyncOptions<T>): UseAsyncResult<T> {
  const [data, setData] = useState<T | undefined>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await asyncFn();

      setData(result);
    } catch (err) {
      const error = normalizeError(err);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [asyncFn]);

  const reset = useCallback(() => {
    setData(initialData);
    setError(null);
    setIsLoading(false);
  }, [initialData]);

  useEffect(() => {
    execute();
  }, [execute]);

  return {
    data,
    isLoading,
    error,
    execute,
    reset,
  };
}
