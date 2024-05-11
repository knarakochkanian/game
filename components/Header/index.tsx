import Image from 'next/image';
import {
  leftSquareBracket,
  leftSquareBracketBlue,
  lines,
  protectBlueTrash,
  rightSquareBracket,
  rightSquareBracketBlue,
  trash,
} from '../../public/summary';
import { IActionCardProps } from '../ActionCard';
import { ATTACK, PROTECTION } from '../../constants';

import styles from './Header.module.scss';

const Header = ({ action, setActionId, fromDetails }: IActionCardProps) => {
  const { actionType, name, isCompleted, date, id } = action;

  const handleClick = () => {
    if (!setActionId) {
      return;
    }
    setActionId(fromDetails ? '' : id);
  };

  return (
    <header
      className={`${styles.header} ${setActionId ? styles.cursorPointer : ''}`}
      onClick={handleClick}
    >
      <div className={styles.leftPart}>
        <h2 className={styles.actionTitle}>
          {actionType === ATTACK ? 'Атака' : 'Защита'} #{name}
        </h2>
        <span
          className={`${styles.actionStatus} ${
            actionType === PROTECTION ? styles.protection : ''
          }`}
        >
          <Image
            src={
              actionType === PROTECTION
                ? leftSquareBracketBlue
                : leftSquareBracket
            }
            alt="leftSquareBracket"
            width={16}
            height={42}
            priority
          />
          {isCompleted ? `выполнена` : `отложенный запуск`}

          <Image
            src={
              actionType === PROTECTION
                ? rightSquareBracketBlue
                : rightSquareBracket
            }
            alt="rightSquareBracket"
            width={16}
            height={42}
            priority
          />
        </span>
      </div>

      <div className={styles.rightPart}>
        <div
          className={`${styles.completingDate} ${
            actionType === PROTECTION ? styles.protection : ''
          }`}
        >
          {!isCompleted && (
            <>
              <Image src={lines} alt="lines" width={120} height={24} priority />
              <span>будет выполнена</span>
            </>
          )}
          <span>{date.split(' ')[0]}</span>
          <span>в {date.split(' ')[1]}</span>
        </div>

        {!isCompleted && (
          <button>
            <Image
              src={actionType === PROTECTION ? protectBlueTrash : trash}
              alt="trash"
              width={48}
              height={48}
              priority
            />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
