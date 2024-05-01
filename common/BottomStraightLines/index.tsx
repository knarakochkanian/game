import Image from 'next/image';
import { bottomStraightLeft, bottomStraightRight } from '../../public/history';

import styles from './BottomStraightLines.module.scss';

const BottomStraightLines = () => {
  return (
    <>
      <Image
        className={styles.lineLeft}
        src={bottomStraightLeft}
        alt="bottom"
        width={970}
        height={81}
        priority
      />
      <Image
        className={styles.lineRight}
        src={bottomStraightRight}
        alt="bottom"
        width={970}
        height={81}
        priority
      />
    </>
  );
};

export default BottomStraightLines;
