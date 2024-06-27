import React from 'react';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { minusSign } from '../../public/main-screen';
import {
  resetDamageLevel,
  selectIsAttacking,
} from '../../redux/features/generalSlice';
import { useAppSelector } from '../../redux/hooks';

import styles from './DamageLevelInfo.module.scss';

const DamageLevelInfo = ({
  damageLevel,
  fromSideNav,
}: {
  damageLevel: string;
  fromSideNav?: boolean;
}) => {
  const dispatch = useDispatch();
  const isAttacking = useAppSelector(selectIsAttacking);

  const handleRemove = () => {
    dispatch(resetDamageLevel());
  };

  return (
    <div
      className={`${damageLevel ? styles.damageLevelInfo : ''} 
      ${!damageLevel && fromSideNav ? styles.damageLevelInfoDisable : ''}
      ${isAttacking ? '' : styles.isProtecting} 
      ${fromSideNav ? styles.fromSideNav : ''}
      `}
    >
      <div className={styles.titleAndInfo}>
        <span className={styles.title}>Ущерб</span>
        <span className={styles.info}>{damageLevel ? damageLevel : ''}</span>
      </div>
      {fromSideNav && (
        <button onClick={handleRemove}>
          <Image
            className={styles.minusSign}
            src={minusSign}
            alt="minusSign"
            width={20}
            height={20}
            priority
          />
        </button>
      )}
    </div>
  );
};

export default DamageLevelInfo;
