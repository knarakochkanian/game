import styles from "./count-down.module.scss"
import React, { useState, useEffect } from 'react';
import '../../app/globals.css';

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
        <div className={styles.countdownContainer}>
            <h5>запуск</h5>
            <div className={styles.timer}>
                <span className={styles.time}>{String(time.hours).padStart(2, '0')}</span>
                <span className={styles.time}>{String(time.minutes).padStart(2, '0')}</span>
                <span className={styles.time}>{String(time.seconds).padStart(2, '0')}</span>
            </div>
            <button className={styles.cancelButton} onClick={cancelCountdown}>
               <h3>
                   Для отмены атаки нажмите кнопку
                   <span>“ОТМЕНА</span>
               </h3>
            </button>
        </div>
    );
}
