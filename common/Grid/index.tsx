import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { grid } from '../../public/count-down';
import { noise } from '../../public/history';
import { pagesWithoutGrid } from '../../constants';

import styles from './Grid.module.scss';

const Grid = () => {
  const pathname = usePathname();
  const gridDisplayNone = pagesWithoutGrid.some((page) =>
    pathname?.split('/').includes(page)
  );

  return (
    <>
      <div
        className={`${styles.grid} ${
          gridDisplayNone ? styles.gridDisplayNone : ''
        }`}
      >
        <Image
          className={styles.gridImg}
          src={grid}
          alt="grid"
          width={1344}
          height={840}
          priority
        />
      </div>

      <Image
        className={styles.noiseImg}
        src={noise}
        alt="noise"
        width={1344}
        height={840}
        priority
      />
    </>
  );
};

export default Grid;
