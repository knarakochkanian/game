'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { bottom, bottomNarrowLines, top } from '../../public/count-down';
import BottomStraightLines from '../BottomStraightLines';
import {
  bottomLinesAreNarrowPages,
  bottomLinesAreStraightPages,
} from '../../constants';
import { selectBlur, setBlur } from '../../redux/features/generalSlice';
import { useAppSelector } from '../../redux/hooks';

import styles from './TopBottomLines.module.scss';

const TopBottomLines = () => {
  const pathname = usePathname();
  const blur = useAppSelector(selectBlur);
  const areBottomLinesStraight = bottomLinesAreStraightPages.some((page) =>
    pathname?.split('/').includes(page)
  );

  const bottomLinesAreNarrow =
    bottomLinesAreNarrowPages.some((page) =>
      pathname?.split('/').includes(page)
    ) || pathname === '/';

  return (
    <>
      <Image
        className={styles.top}
        src={top}
        alt="top"
        width={2754}
        height={81}
        priority
        style={{ filter: blur ? 'blur(22px)' : 'none' }}
      />
      {areBottomLinesStraight ? (
        <BottomStraightLines />
      ) : bottomLinesAreNarrow ? (
        <Image
          className={styles.bottom}
          src={bottomNarrowLines}
          alt="bottom"
          width={2752}
          height={81}
          priority
        />
      ) : (
        <Image
          className={styles.bottom}
          src={bottom}
          alt="bottom"
          width={2754}
          height={81}
          priority
          style={{ filter: blur ? 'blur(22px)' : 'none' }}
        />
      )}
    </>
  );
};

export default TopBottomLines;
