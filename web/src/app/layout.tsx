import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

import { MswProvider } from '../libs/msw/msw-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hol1kgmg Portfolio',
  description: 'Hol1kgmg の制作物をまとめたポートフォリオです。',
  metadataBase: new URL('https://hol1kgmg.com'),
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Hol1kgmg Portfolio',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="ja">
      <body>
        <MswProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </MswProvider>
      </body>
    </html>
  );
}
