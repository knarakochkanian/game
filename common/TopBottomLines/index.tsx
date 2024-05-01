'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { bottom, top } from '../../public/count-down';
import BottomStraightLines from '../BottomStraightLines';
import useGetPage from '../../hooks/useGetPage';
import { HISTORY } from '../../constants';

import styles from './TopBottomLines.module.scss';

const TopBottomLines = () => {
  const pathname = usePathname();
  const isInHistory = pathname?.split('/').includes(HISTORY);

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
      {isInHistory ? (
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
