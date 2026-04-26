import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

import { MswProvider } from '../libs/msw/msw-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hol1kgmg | Subdomain Hub',
  description: 'Hol1kgmg が運営するサブドメインをまとめたハブページです。',
  metadataBase: new URL('https://hol1kgmg.com'),
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
