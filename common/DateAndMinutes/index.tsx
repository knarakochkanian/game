import Image from 'next/image';
import { read } from '../../public/news';
import timeAgo from '../../helpers/timeAgo';

import styles from './DateAndMinutes.module.scss';
import { useNTP } from '../../contexts/NTPDateContext';

const DateAndMinutes = ({
  date,
  fullDate
}: {
  fullDate: string,
  date: string;
}) => {
  const {getDate} = useNTP()
  
  return (
    <div className={styles.date}>
      <span>{date}</span>
      <span>
        <Image src={read} alt="read" width={20} height={20} priority />
        {timeAgo(getDate(), fullDate)}
      </span>
    </div>
  );
};

export default DateAndMinutes;
