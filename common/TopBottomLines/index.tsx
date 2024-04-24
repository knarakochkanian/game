import Image from 'next/image';
import { bottom, top } from '../../public/count-down';

import styles from './TopBottomLines.module.scss';

const TopBottomLines = () => {
  return (
    <>
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
    </>
  );
};

export default TopBottomLines;
