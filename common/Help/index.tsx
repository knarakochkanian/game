import Image from 'next/image';
import { helpIcon } from '../../public/main-screen';

import styles from './Help.module.scss';

const Help = () => {
  return (
    <button className={styles.helpIcon}>
      <Image alt="helpIcon" src={helpIcon} width={88} height={88} priority />
    </button>
  );
};

export default Help;
