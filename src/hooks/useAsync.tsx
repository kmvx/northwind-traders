'use client';

import { useCallback, useEffect, useState } from 'react';

import { normalizeError } from '@/utils';

// NOTE: Use asyncFn for queries, setPromise() - for mutations

interface UseAsyncOptions<T> {
  asyncFn?: () => Promise<T>; // Must be memoized
  initialData?: T;
}

interface UseAsyncResult<T> {
  data: T | undefined;
  isLoading: boolean;
  error: Error | null;
  execute: () => Promise<void>;
  setPromise: (promise: Promise<T>) => Promise<void>;
  reset: () => void;
}

export default function useAsync<T>(
  props?: UseAsyncOptions<T>,
): UseAsyncResult<T> {
  const { asyncFn, initialData } = props ?? {};

  const [data, setData] = useState<T | undefined>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const setPromise = useCallback(async (promise: Promise<T>) => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await promise;
      setData(result);
    } catch (err) {
      const error = normalizeError(err);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const execute = useCallback(async () => {
    if (asyncFn) {
      setPromise(asyncFn());
    }
  }, [asyncFn, setPromise]);

  useEffect(() => {
    execute();
  }, [execute]);

  const reset = useCallback(() => {
    setData(initialData);
    setError(null);
    setIsLoading(false);
  }, [initialData]);

  return {
    data,
    isLoading,
    error,
    execute,
    setPromise,
    reset,
  };
}
