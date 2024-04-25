import Image from 'next/image';
import { arrowDown, arrowUp } from '../../public/summary';

import styles from './DropdownArrow.module.scss';

const DropdownArrow = ({ open }: { open: boolean }) => {
  return (
    <>
      {open ? (
        <Image
          className={styles.arrow}
          src={arrowUp}
          alt="arrowUp"
          width={24}
          height={24}
          priority
        />
      ) : (
        <Image
          className={styles.arrow}
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

export default DropdownArrow;
