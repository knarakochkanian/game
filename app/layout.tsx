import type { Metadata } from 'next';
import { Suspense } from 'react';
import Loading from '../components/Loading';
import TopBottomLines from '../common/TopBottomLines';
import LocalTime from '../components/LocalTime';

import './globals.scss';

export const metadata: Metadata = {
  title: 'Game',
  description: 'Game about attacks and protected',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Suspense fallback={<Loading />}>
        <body>
          <TopBottomLines />
          <LocalTime />
          {children}
        </body>
      </Suspense>
    </html>
  );
}
