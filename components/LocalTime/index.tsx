'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { pagesWithoutLocalTime } from '../../constants';

import styles from './LocalTime.module.scss';
import { selectBlur, selectLocalTimeBlur, selectOnboardingBlur } from '../../redux/features/generalSlice';
import { useAppSelector } from '../../redux/hooks';
import useGetPage from '../../hooks/useGetPage';
import { useSelector } from 'react-redux';
import { useNTP } from '../../contexts/NTPDateContext';
const Index: React.FC = () => {
  const [dateTime, setDateTime] = useState<string>('');
  const [timeBlur, setTimeBlur] = useState('blur(22px)');
  const pathname = usePathname();
  const blur = useAppSelector(selectBlur);
  const localTimeDisplayNone = pagesWithoutLocalTime.some((page) =>
    pathname?.split('/').includes(page)
  );
  const onBoardingBlur = useSelector(selectOnboardingBlur);
  const localTimeBlur = useSelector(selectLocalTimeBlur);

  const {getDate} = useNTP()

  useEffect(() => {
    if (localTimeBlur === true) {
      setTimeBlur('blur(22px)')
    }
    else {
      setTimeBlur('none')
    }
  }, [localTimeBlur])
  
  useEffect(() => {
    const updateDateTime = () => {
      const now = getDate();

      if(now === null) {
        setDateTime("");
        return
      }

      const timeString = new Intl.DateTimeFormat('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      }).format(now);

      const monthString = new Intl.DateTimeFormat('ru-RU', {
        month: 'long',
      })
        .format(now)
        .slice(0, 4);

      const dateString = new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
      }).format(now);

      setDateTime(`${dateString} ${monthString} ${timeString}`);
    };

    updateDateTime(); // Initialize immediately
    const timerId = setInterval(updateDateTime, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [getDate]);

  return (
    <span
      // style={{ filter: blur ? 'blur(22px)' : 'none' }}
      style={{filter: timeBlur}}
      className={`${styles.DateTime} ${
        localTimeDisplayNone ? styles.displayNone : ''
      }`}
    >
      {dateTime}
    </span>
  );
};

export default Index;
