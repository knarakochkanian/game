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
import { useAppDispatch } from '../../redux/hooks';
import { resetGeneralState } from '../../redux/features/generalSlice';

export default function HistoryAndNewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const onBack = () => {
    setTimeout(() => {
      dispatch(resetGeneralState());
    }, 10);

    router.back();
  };

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
          width={1344}
          height={214}
          priority
        />
        {children}
      </Suspense>
    </div>
  );
}
