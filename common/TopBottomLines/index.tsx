'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { bottom, top } from '../../public/count-down';
import BottomStraightLines from '../BottomStraightLines';
import { bottomLinesAreStraightPages } from '../../constants';

import styles from './TopBottomLines.module.scss';

const TopBottomLines = () => {
  const pathname = usePathname();
  const areBottomLinesStraight = bottomLinesAreStraightPages.some((page) =>
    pathname?.split('/').includes(page)
  );

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
      {areBottomLinesStraight ? (
        <BottomStraightLines />
      ) : (
        <Image
          className={styles.bottom}
          src={bottom}
          alt="bottom"
          width={2754}
          height={81}
          priority
        />
      )}
    </>
  );
};

export default TopBottomLines;
