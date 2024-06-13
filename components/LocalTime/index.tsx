'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { pagesWithoutLocalTime } from '../../constants';

import styles from './LocalTime.module.scss';
import { selectBlur } from '../../redux/features/generalSlice';
import { useAppSelector } from '../../redux/hooks';
const Index: React.FC = () => {
  const [dateTime, setDateTime] = useState<string>('');
  const pathname = usePathname();
  const blur = useAppSelector(selectBlur);
  const localTimeDisplayNone = pagesWithoutLocalTime.some((page) =>
    pathname?.split('/').includes(page)
  );

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
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
  }, []);

  return (
    <span
      style={{ filter: blur ? 'none' : 'blur(22px)' }}
      className={`${styles.DateTime} ${
        localTimeDisplayNone ? styles.displayNone : ''
      }`}
    >
      {dateTime}
    </span>
  );
};

export default Index;
