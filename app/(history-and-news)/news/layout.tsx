'use client';

import { Suspense } from 'react';
import Loading from '../../../components/Loading';
import AttacksWithDates from '../../../components/AttacksWithDates';
import attacks from '../../../data/attacks';

import styles from './layout.module.scss';

export default function NewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.newsLayout}>
      <Suspense fallback={<Loading />}>
        <h1>Влияние на мир</h1>

        <div className={styles.container}>
          <AttacksWithDates attacks={attacks} />
          {children}
        </div>
      </Suspense>
    </div>
  );
}
