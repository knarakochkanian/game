'use client';

import { Suspense } from 'react';
import Loading from '../../../components/Loading';
import AttacksWithDates from '../../../components/AttacksWithDates';

import styles from './layout.module.scss';
import { getItemFromStorage } from '../../../helpers';
import { COMPLETED_ACTIONS } from '../../../constants';

export default function NewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const actions = getItemFromStorage(COMPLETED_ACTIONS);

  return (
    <div className={styles.newsLayout}>
      <Suspense fallback={<Loading />}>
        <h1>Влияние на мир</h1>

        <div className={styles.container}>
          <AttacksWithDates attacks={actions} />
          {children}
        </div>
      </Suspense>
    </div>
  );
}
