'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './launch-stopped.module.scss';
import Image from 'next/image';

const LaunchStopped = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/');
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className={styles.launch}>
      <Image
        src={'/home/launch-background.svg'}
        alt={'launchBackground'}
        width={1300}
        height={800}
        className={styles.launchImg}
      />
      <h1>ЗАПУСК ОСТАНОВЛЕН</h1>
    </section>
  );
};

export default LaunchStopped;
