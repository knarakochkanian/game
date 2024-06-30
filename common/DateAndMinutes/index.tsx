import Image from 'next/image';
import { read } from '../../public/news';
import timeAgo from '../../helpers/timeAgo';

import styles from './DateAndMinutes.module.scss';

const DateAndMinutes = ({
  date,
  fullDate
}: {
  fullDate: string,
  date: string;
}) => {
  return (
    <div className={styles.date}>
      <span>{date}</span>
      <span>
        <Image src={read} alt="read" width={20} height={20} priority />
        {timeAgo(fullDate)}
      </span>
    </div>
  );
};

export default DateAndMinutes;
