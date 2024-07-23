'use client';

import { useState, useEffect, useCallback } from 'react';
import Loading from '../components/Loading';
import Password from '../components/Password';
//import MainScreen from '../components/MainScreen';
const MainScreen = dynamic(() => import('../components/MainScreen'), {
  ssr: false,
})
import styles from './page.module.scss';
import { useDispatch } from 'react-redux';
import {
  setLocalTimeBlur,
  setOnBoardingBlur,
} from '../redux/features/generalSlice';
import { useMapContext } from '../contexts/MapContext';
import dynamic from 'next/dynamic';

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [onboardingPassed, setOnboardingPassed] = useState(false);
  const [isPasswordPassed, setIsPasswordPassed] = useState<boolean | null>(null);
  const dispatch = useDispatch();
  const {isMapLoaded} = useMapContext();

  const hideSplash = useCallback(() => {
    const timeoutId = setTimeout(() => {
      const passwordPassed = window.localStorage.getItem('isPasswordPassed') === 'true';
      setIsPasswordPassed(passwordPassed);
      setLoading(false);
      return () => clearTimeout(timeoutId);
    }, 2000);
  }, [setLoading, setIsPasswordPassed]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const onboardingPassed =
        window.localStorage.getItem('isOnboardingPassed') === 'true';
      dispatch(setLocalTimeBlur(false));
      setOnboardingPassed(onboardingPassed);
      hideSplash();

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
  }, [dispatch, hideSplash]);

  const loading = <div className={styles.fullscreenWrapper} style={{ zIndex: 100}}><Loading/></div>
  const password = <div className={styles.fullscreenWrapper} style={{zIndex: 101}}><Password setIsPasswordPassed={setIsPasswordPassed} /> </div>

  return (
    <main className={styles.main} style={{position: 'relative'}}>
      <>
      {(!isMapLoaded || isPasswordPassed === null) && loading}
      {isPasswordPassed === false && password}
      <MainScreen isVisible={isPasswordPassed === true && isMapLoaded === true}/>
      </>
    </main>
  );
}
