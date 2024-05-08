import Image from 'next/image';
import {
  leftSquareBracket,
  lines,
  rightSquareBracket,
  trash,
} from '../../public/summary';
import { IAttackCardProps } from '../AttackCard';

import styles from './Header.module.scss';

const Header = ({ attack, setAttackId, fromDetails }: IAttackCardProps) => {
  const handleClick = () => {
    if (!setAttackId) {
      return;
    }
    setAttackId(fromDetails ? '' : attack.id);
  };

  return (
    <header
      className={`${styles.header} ${setAttackId ? styles.cursorPointer : ''}`}
      onClick={handleClick}
    >
      <div className={styles.leftPart}>
        <h2 className={styles.attackTitle}>Атака #{attack.name}</h2>
        <span className={styles.delayedStart}>
          <Image
            src={leftSquareBracket}
            alt="leftSquareBracket"
            width={16}
            height={42}
            priority
          />
          {attack.isCompleted ? `выполнена` : `отложенный запуск`}

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
          {!attack.isCompleted && (
            <>
              <Image src={lines} alt="lines" width={120} height={24} priority />
              <span>будет выполнена</span>
            </>
          )}
          <span>{attack.date.split(' ')[0]}</span>
          <span>в {attack.date.split(' ')[1]}</span>
        </div>

        {!attack.isCompleted && (
          <button>
            <Image src={trash} alt="trash" width={48} height={48} priority />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
