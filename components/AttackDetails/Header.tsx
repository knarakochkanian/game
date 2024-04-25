import Image from 'next/image';
import {
  leftSquareBracket,
  lines,
  rightSquareBracket,
  trash,
} from '../../public/summary';

import styles from './AttackDetails.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.leftPart}>
        <h2 className={styles.attackTitle}>Атака #000-001</h2>
        <span className={styles.delayedStart}>
          <Image
            src={leftSquareBracket}
            alt="leftSquareBracket"
            width={16}
            height={42}
            priority
          />
          отложенный запуск
          <Image
            src={rightSquareBracket}
            alt="rightSquareBracket"
            width={16}
            height={42}
            priority
          />
        </span>
      </div>

      <div className={styles.rightPart}>
        <div className={styles.completingDate}>
          <Image src={lines} alt="lines" width={120} height={24} priority />
          <span>будет выполнена</span>
          <span>03.02.2024</span>
          <span>в 20:13</span>
        </div>

        <button>
          <Image src={trash} alt="trash" width={48} height={48} priority />
        </button>
      </div>
    </header>
  );
};

export default Header;
