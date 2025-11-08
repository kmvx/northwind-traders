import './globals.css';

import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { AppSidebar, Providers } from '@/components';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { FullscreenToggle } from '@/ui';
import { buildTitle } from '@/utils';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: buildTitle(),
  description: 'Northwind Traders demo application',
  icons: {
    icon: '/favicon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <SidebarProvider>
            <AppSidebar />
            <main className="w-full sm:px-2">
              <div
                className="p-2 sm:absolute sm:top-2 sm:left-2 flex gap-2"
                style={{
                  marginLeft: 'env(safe-area-inset-left)',
                }}
              >
                <SidebarTrigger
                  variant="outline"
                  className="size-9 bg-transparent"
                />
                <FullscreenToggle className="sm:hidden bg-transparent" />
              </div>
              {children}
            </main>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
