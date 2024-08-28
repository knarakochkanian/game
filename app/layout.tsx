import type { Metadata } from 'next';
import { Suspense } from 'react';
import Loading from '../components/Loading';
import TopBottomLines from '../common/TopBottomLines';
import LocalTime from '../components/LocalTime';
import ReduxProvider from '../redux/provider';

import './globals.scss';
import { Keyboard } from '@capacitor/keyboard';

const APP_NAME = 'MAP';
const APP_DEFAULT_TITLE = 'MAP';
const APP_TITLE_TEMPLATE = 'MAP';
const APP_DESCRIPTION = 'MAP';

Keyboard.hide();

export const metadata: Metadata = {
  title: 'Game',
  description: 'Game about attacks and protected',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: APP_DEFAULT_TITLE,
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

import localFont from '@next/font/local';
import { WebSocketProvider } from '../contexts/WebSocketContext';
import { NTPProvider } from '../contexts/NTPDateContext';
import { MapProvider } from '../contexts/MapContext';
import { DelayedLaunchProvider } from '../contexts/DelayedLaunchContext';

const lakes = localFont({
  src: [
    {
      path: '../public/fonts/tt-lakes-neue-trial-cdnfonts/TT Lakes Neue Trial Black.ttf',
      weight: '400',
    },
    {
      path: '../public/fonts/tt-lakes-neue-trial-cdnfonts/TT Lakes Neue Trial Bold.ttf',
      weight: '600',
    },
    {
      path: '../public/fonts/tt-lakes-neue-trial-cdnfonts/TT Lakes Neue Trial Medium.ttf',
      weight: '400',
    },
  ],
  variable: '--font-lakes',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lakes.variable} font-sans`}>
      <body>
        <NTPProvider>
          <Suspense fallback={<div></div>}>
            <WebSocketProvider>
              <ReduxProvider>
                <DelayedLaunchProvider>
                  <MapProvider>
                    <TopBottomLines />
                    <LocalTime />
                    {children}
                  </MapProvider>
                </DelayedLaunchProvider>
              </ReduxProvider>
            </WebSocketProvider>
          </Suspense>
        </NTPProvider>
      </body>
    </html>
  );
}
