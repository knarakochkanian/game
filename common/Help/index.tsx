import Image from 'next/image';
import { helpIcon } from '../../public/main-screen';

import styles from './Help.module.scss';

const Help = () => {
  return (
    <Image
      alt="helpIcon"
      className={styles.helpIcon}
      src={helpIcon}
      width={88}
      height={88}
      priority
    />
  );
};

export default Help;
