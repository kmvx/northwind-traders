import './globals.css';

import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { AppSidebar, Providers } from '@/components';
import { SidebarProvider } from '@/components/ui/sidebar';
import { TopbarControls } from '@/ui';
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
            <main className="w-full sm:m-2">
              <TopbarControls />
              {children}
            </main>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
