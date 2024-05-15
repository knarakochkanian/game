'use client';

import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import Loading from '../../components/Loading';
import BackButton from '../../common/BackButton';
import SideLines from '../../common/SideLines';
import Grid from '../../common/Grid';
import Image from 'next/image';
import { darkerGradient } from '../../public/history';

import styles from './layout.module.scss';

export default function HistoryAndNewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const onBack = () => router.push('/');

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <BackButton onBack={onBack} />
        <SideLines />
        <Grid />
        <Image
          className={styles.darkerGradient}
          src={darkerGradient}
          alt="darkerGradient"
          width={2800}
          height={214}
          priority
        />
        {children}
      </Suspense>
    </div>
  );
}
