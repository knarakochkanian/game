'use client';

import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import Password from '../components/Password';
import MainScreen from '../components/MainScreen';

import styles from './page.module.css';
import { useDispatch } from 'react-redux';
import {
  setLocalTimeBlur,
  setOnBoardingBlur,
} from '../redux/features/generalSlice';

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [onboardingPassed, setOnboardingPassed] = useState(false);
  const [isPasswordPassed, setIsPasswordPassed] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const passwordPassed =
        window.localStorage.getItem('isPasswordPassed') === 'true';
      const onboardingPassed =
        window.localStorage.getItem('isOnboardingPassed') === 'true';
      dispatch(setLocalTimeBlur(false));
      setIsPasswordPassed(passwordPassed);
      setOnboardingPassed(onboardingPassed);
      setLoading(false);

      if (onboardingPassed) {
        dispatch(
          setOnBoardingBlur({
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
            7: false,
            8: false,
            9: false,
            10: false,
            11: false,
            12: false,
          })
        );
      }

      return () => {
        document.visibilityState !== 'visible' &&
          window.localStorage.removeItem('isPasswordPassed');
      };
    }
  }, [dispatch]);

  return (
    <main className={styles.main}>
      {isLoading ? (
        <Loading />
      ) : onboardingPassed || isPasswordPassed ? (
        <MainScreen />
      ) : (
        <Password setIsPasswordPassed={setIsPasswordPassed} />
      )}
    </main>
  );
}
