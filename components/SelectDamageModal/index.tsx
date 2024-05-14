'use client';

import Image from 'next/image';
import styles from './SelectDamageModal.module.scss';
import { useAppDispatch } from '../../redux/hooks';
import { setDamageLevel } from '../../redux/features/generalSlice';
import { CRITICAL, MINIMAL, WARNING } from '../../constants';

const SelectDamageModal = () => {
  const dispatch = useAppDispatch();

  const handleLevelClick = (level: string) => {
    dispatch(setDamageLevel(level));
  };

  return (
    <div className={styles.damageLevelTheGorge}>
      <h5>уровень ущерба</h5>
      <div className="TypoBodyBig" style={{ color: '#787878' }}>
        Для каждой задачи доступен выбор только одного уровня ущерба.
      </div>
      <ul className={styles.damageLevelTheGorgeList}>
        <li>
          <button
            className="SecondarySmall"
            onClick={() => handleLevelClick(CRITICAL)}
          >
            <span>
              <div className={styles.damageLevelTheGorgeListItem}>
                <Image
                  src={'onboarding/square.svg'}
                  alt={'square'}
                  width={40}
                  height={40}
                />

                <h4>критический</h4>
              </div>
              <Image
                src={'onboarding/info.svg'}
                alt={'square'}
                width={40}
                height={40}
              />
            </span>
          </button>
        </li>
        <li>
          <button
            className="SecondarySmall"
            onClick={() => handleLevelClick(MINIMAL)}
          >
            <span>
              <div className={styles.damageLevelTheGorgeListItem}>
                <Image
                  src={'onboarding/squareMid.svg'}
                  alt={'square'}
                  width={40}
                  height={40}
                />

                <h4>минимальный</h4>
              </div>
              <Image
                src={'onboarding/info.svg'}
                alt={'square'}
                width={40}
                height={40}
              />
            </span>
          </button>
        </li>
        <li>
          <button
            className="SecondarySmall"
            onClick={() => handleLevelClick(WARNING)}
          >
            <span>
              <div className={styles.damageLevelTheGorgeListItem}>
                <Image
                  src={'onboarding/squareLittle.svg'}
                  alt={'square'}
                  width={40}
                  height={40}
                />

                <h4>предупреждение</h4>
              </div>
              <Image
                src={'onboarding/info.svg'}
                alt={'square'}
                width={40}
                height={40}
              />
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SelectDamageModal;
