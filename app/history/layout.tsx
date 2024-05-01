'use client';

import { Suspense } from 'react';
import Loading from '../../components/Loading';
import BackButton from '../../common/BackButton';
import SideLines from '../../common/SideLines';
import Grid from '../../common/Grid';

import styles from './layout.module.scss';

export default function HistoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const onBack = () => {
    console.log('onBack');
  };

  return (
    <div className={styles.historyLayout}>
      <Suspense fallback={<Loading />}>
        <BackButton onBack={onBack} />
        <SideLines />
        <Grid />
        <h1>История запусков</h1>
        {children}
      </Suspense>
    </div>
  );
}
