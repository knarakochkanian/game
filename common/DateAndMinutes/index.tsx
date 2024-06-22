import Image from 'next/image';
import { read } from '../../public/news';

import styles from './DateAndMinutes.module.scss';

const DateAndMinutes = ({
  date,
  minutes,
}: {
  date: string;
  minutes: number;
}) => {
  return (
    <div className={styles.date}>
      <span>{date}</span>
      <span>
        <Image src={read} alt="read" width={20} height={20} priority />
        {minutes} мин
      </span>
    </div>
  );
};

export default DateAndMinutes;
