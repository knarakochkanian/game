'use client';

import { Suspense, useEffect, useState } from 'react';
import Loading from '../../../components/Loading';
import AttacksWithDates from '../../../components/AttacksWithDates';
import { getItemFromStorage } from '../../../helpers';
import { COMPLETED_ACTIONS } from '../../../constants';

import styles from './layout.module.scss';

export default function NewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [actions, setActions] = useState<IAction[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedActions = getItemFromStorage(COMPLETED_ACTIONS, window);
      setActions(storedActions);
    }
  }, []);

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
