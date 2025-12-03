'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import React from 'react';

import { Toaster } from '@/components/ui/sonner';
import FetchError from '@/utils/FetchError';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const url = queryKey[0] as string;
        const response = await fetch(url);

        if (!response.ok) {
          throw new FetchError(response);
        }

        const data = await response.json();
        // if (Math.random() < 0.5) throw new Error('Test network error');
        return data;
      },
      retry: (failureCount, error: unknown) => {
        // return false;
        if (error instanceof FetchError) {
          if (error.status >= 400 && error.status < 500) return false;
        }
        return failureCount < 3;
      },

      staleTime: 60e3, // 1 min
      // refetchOnWindowFocus: false,
    },
  },
});

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          <ProvidersInit>{children}</ProvidersInit>
        </NuqsAdapter>
        <Toaster position="top-center" richColors />
        {/* <ReactQueryDevtools buttonPosition="bottom-left" /> */}
      </QueryClientProvider>
    </ThemeProvider>
  );
};

interface ProvidersInitProps {
  children: React.ReactNode;
}

const ProvidersInit: React.FC<ProvidersInitProps> = ({ children }) => {
  return <>{children}</>;
};

export default Providers;
