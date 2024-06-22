'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Loading.module.scss';

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 30;
      });
    }, 0);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.loading}>
        <Image
          className={styles.loadingIcon}
          src={'/loading/TaskIcon.svg'}
          alt="loader icon"
          width={40}
          height={40}
        />
        <h4>Загрузка</h4>
      </div>
      <div className={styles.Loader}>
        <Image
          className={styles.loadingIcon}
          src={'/loading/Group.svg'}
          alt="loader icon"
          width={619}
          height={619}
        />
        <Image
          className={styles.loadingIcon}
          src={'/loading/Group2.svg'}
          alt="loader icon"
          width={562}
          height={560}
        />
        <Image
          className={styles.loadingIcon}
          src={'/loading/Group3.svg'}
          alt="loader icon"
          width={440}
          height={440}
        />
        <Image
          className={styles.loadingIcon}
          src={'/loading/Group4.svg'}
          alt="loader icon"
          width={400}
          height={400}
        />
        <Image
          className={styles.loadingIcon}
          src={'/loading/Group5.svg'}
          alt="loader icon"
          width={340}
          height={340}
        />
        <Image
          className={styles.loadingIcon}
          src={'/loading/Group6.svg'}
          alt="loader icon"
          width={290}
          height={290}
        />
        <Image
          className={styles.loadingIcon}
          src={'/loading/Group7.svg'}
          alt="loader icon"
          width={190}
          height={190}
        />
        <Image
          className={styles.loadingIcon}
          src={'/loading/Group8.png'}
          alt="loader icon"
          width={120}
          height={120}
        />
        <Image
          className={styles.loadingIcon}
          src={'/loading/Group10.svg'}
          alt="loader icon"
          width={63}
          height={63}
        />
      </div>
      <div className={styles.progressBarWrapper}>
        <Image
          src={'/main-screen/ProgressBarLeft.svg'}
          alt="progressBarLeft"
          width={20}
          height={48}
          className={styles.progressBarImgLeft}
        />
        <div className={styles.progressBarContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <Image
          src={'/main-screen/ProgressBarRight.svg'}
          alt="progressBarLeft"
          width={20}
          height={48}
          className={styles.progressBarImgRight}
        />
      </div>
    </div>
  );
}
