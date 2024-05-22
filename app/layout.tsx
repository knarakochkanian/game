import type { Metadata } from 'next';
import { Suspense } from 'react';
import Loading from '../components/Loading';
import TopBottomLines from '../common/TopBottomLines';
import LocalTime from '../components/LocalTime';
import ReduxProvider from '../redux/provider';
// eslint-disable-next-line @next/next/no-document-import-in-page
import { Head } from 'next/document';
import './globals.scss';
const APP_NAME = 'MAP';
const APP_DEFAULT_TITLE = 'MAP';
const APP_TITLE_TEMPLATE = 'MAP';
const APP_DESCRIPTION = 'MAP';
export const metadata: Metadata = {
  title: 'Game',
  description: 'Game about attacks and protected',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
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
