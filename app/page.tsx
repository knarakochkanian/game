'use client';

import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import Password from '../components/Password';
import MainScreen from '../components/MainScreen';

import styles from './page.module.css';

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const onboardingPassed = true;

  useEffect(() => {
    setLoading(false);
  }, []);

  return onboardingPassed ? (
    <MainScreen />
  ) : (
    <main className={styles.main}>
      {isLoading ? <Loading /> : <Password />}
    </main>
  );
}
