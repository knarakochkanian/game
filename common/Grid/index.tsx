import Image from 'next/image';
import { grid } from '../../public/count-down';

import styles from './Grid.module.scss';

const Grid = () => {
  return (
    <div className={styles.grid}>
      <Image
        className={styles.gridImg}
        src={grid}
        alt="grid"
        width={2800}
        height={1752}
        priority
      />
    </div>
  );
};

export default Grid;
