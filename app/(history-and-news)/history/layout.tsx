'use client';

import { Suspense } from 'react';
import Loading from '../../../components/Loading';

import styles from './layout.module.scss';

export default function HistoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className={styles.historyLayout}>
      <Suspense fallback={<Loading />}>
        <h1>История запусков</h1>
        {children}
      </Suspense>
    </div>
  );
}
