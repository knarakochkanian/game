import Image from 'next/image';
import { sideLines } from '../../public/count-down';

import styles from './SideLines.module.scss';

const SideLines = () => {
  return (
    <div className={styles.sideLines}>
      <Image
        src={sideLines}
        alt="sideLines"
        width={1295}
        height={690}
        className={styles.sideLines}
        priority
      />
    </div>
  );
};

export default SideLines;
