import Image from 'next/image';
import { arrowDown, arrowUp } from '../../public/summary';

import styles from './Arrow.module.scss';

const Arrow = ({ open, name = '' }: { open: boolean; name?: string }) => {
  return (
    <>
      {open ? (
        <Image
          className={`${styles.arrow} ${styles[name]} ${styles.isOpen}`}
          src={arrowUp}
          alt="arrowUp"
          width={24}
          height={24}
          priority
        />
      ) : (
        <Image
          className={`${styles.arrow} ${styles[name]}`}
          src={arrowDown}
          alt="arrowDown"
          width={24}
          height={24}
          priority
        />
      )}
    </>
  );
};

export default Arrow;
