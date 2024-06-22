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
      {!gridDisplayNone && pathname !== '/' && (
        <div className={styles.grid}>
          <Image
            className={styles.gridImg}
            src={grid}
            alt="grid"
            width={1344}
            height={840}
            priority
          />
        </div>
      )}

      <Image
        className={styles.noiseImg}
        src={noise}
        alt="noise"
        width={1318}
        height={825}
        priority
      />
    </>
  );
};

export default Grid;
