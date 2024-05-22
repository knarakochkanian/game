import type { Metadata } from 'next';
import { Suspense } from 'react';
import Loading from '../components/Loading';
import TopBottomLines from '../common/TopBottomLines';
import LocalTime from '../components/LocalTime';
import ReduxProvider from '../redux/provider';
// eslint-disable-next-line @next/next/no-document-import-in-page
import { Head } from 'next/document';
import './globals.scss';

export const metadata: Metadata = {
  title: 'Game',
  description: 'Game about attacks and protected',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<Loading />}>
          <ReduxProvider>
            <TopBottomLines />
            <LocalTime />
            {children}
          </ReduxProvider>
        </Suspense>
      </body>
    </html>
  );
}
