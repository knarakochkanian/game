import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Footer from '../../components/Footer';
import { attack, bottom, top } from '../../public/count-down';
import Slashes from '../../common/Slashes';
import Loader from '../../common/Loader';
import SideLines from '../../common/SideLines';

import styles from './count-down.module.scss';
import '../../app/globals.scss';

export default function CountDown() {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 15 });

  useEffect(() => {
    const countdown = setInterval(() => {
      if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
        clearInterval(countdown);
      } else if (time.seconds > 0) {
        setTime({ ...time, seconds: time.seconds - 1 });
      } else if (time.minutes > 0) {
        setTime({ ...time, minutes: time.minutes - 1, seconds: 59 });
      } else if (time.hours > 0) {
        setTime({ ...time, hours: time.hours - 1, minutes: 59, seconds: 59 });
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [time]);

  const cancelCountdown = () => {
    setTime({ ...time, hours: 0, minutes: 0, seconds: 0 });
  };

  return (
    <>
      <div className={styles.countdownContainer}>
        <h5>запуск</h5>

        <div className={styles.timerAndAttackCtn}>
          <div className={styles.timer}>
            <span className={styles.time}>
              {String(time.hours).padStart(2, '0')}
              <span className={styles.hours}>часы</span>
            </span>
            <span className={styles.time}>
              {String(time.minutes).padStart(2, '0')}
              <span className={styles.minutes}>минуты</span>
            </span>
            <span className={styles.time}>
              {String(time.seconds).padStart(2, '0')}
              <span className={styles.seconds}>секунды</span>
            </span>
          </div>

          <div className={styles.attack}>
            <Image src={attack} alt="attack" width={80} height={80} priority />
            <h2 className={styles.attackTitle}>Атака #000-001</h2>
          </div>
        </div>
      </div>

      <Image
        className={styles.top}
        src={top}
        alt="top"
        width={2754}
        height={81}
        priority
      />
      <Image
        className={styles.bottom}
        src={bottom}
        alt="bottom"
        width={2754}
        height={81}
        priority
      />
      <SideLines />
      <Loader />
      <Slashes />

      <Footer cancelCountdown={cancelCountdown} />
    </>
  );
}
