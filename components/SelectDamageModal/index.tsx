'use client';

import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectDamgeLevel,
  selectIsAttacking,
  setDamageLevel,
} from '../../redux/features/generalSlice';
import { CRITICAL, MINIMAL, WARNING } from '../../constants';
import { getLiClassnames } from '../../helpers/helpers_1';

import styles from './SelectDamageModal.module.scss';

const SelectDamageModal = () => {
  const dispatch = useAppDispatch();
  const damageLevel = useAppSelector(selectDamgeLevel);
  const isAttacking = useAppSelector(selectIsAttacking);
  const liClassnames = {
    critical: getLiClassnames(damageLevel, isAttacking, CRITICAL, styles),
    minimal: getLiClassnames(damageLevel, isAttacking, MINIMAL, styles),
    warning: getLiClassnames(damageLevel, isAttacking, WARNING, styles),
  }

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
        <li
          className={liClassnames.critical}
        >
          <button
            className="SecondarySmall"
            onClick={() => handleLevelClick(CRITICAL)}
          >
            <span>
              <div className={styles.damageLevelTheGorgeListItem}>
                <Image
                  src={'onboarding/square.svg'}
                  alt={'square'}
                  width={20}
                  height={20}
                />

                <h4>критический</h4>
              </div>
              <Image
                src={'onboarding/info.svg'}
                alt={'square'}
                width={20}
                height={20}
              />
            </span>
          </button>
        </li>
        <li className={liClassnames.minimal}>
          <button
            className="SecondarySmall"
            onClick={() => handleLevelClick(MINIMAL)}
          >
            <span>
              <div className={styles.damageLevelTheGorgeListItem}>
                <Image
                  src={'onboarding/squareMid.svg'}
                  alt={'square'}
                  width={20}
                  height={20}
                />

                <h4>минимальный</h4>
              </div>
              <Image
                src={'onboarding/info.svg'}
                alt={'square'}
                width={20}
                height={20}
              />
            </span>
          </button>
        </li>
        <li className={liClassnames.warning}>
          <button
            className="SecondarySmall"
            onClick={() => handleLevelClick(WARNING)}
          >
            <span>
              <div className={styles.damageLevelTheGorgeListItem}>
                <Image
                  src={'onboarding/squareLittle.svg'}
                  alt={'square'}
                  width={20}
                  height={20}
                />

                <h4>предупреждение</h4>
              </div>
              <Image
                src={'onboarding/info.svg'}
                alt={'square'}
                width={20}
                height={20}
              />
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SelectDamageModal;
