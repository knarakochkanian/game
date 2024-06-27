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

const DamageLevelInfo = ({ damageLevel }: { damageLevel: string }) => {
  const dispatch = useDispatch();
  const isAttacking = useAppSelector(selectIsAttacking);

  const handleRemove = () => {
    dispatch(resetDamageLevel());
  };

  return (
    <div
      className={`${
        damageLevel ? styles.damageLevelInfo : styles.damageLevelInfoDisable
      } ${isAttacking ? '' : styles.isProtecting}`}
    >
      <div className={styles.titleAndInfo}>
        <span className={styles.title}>Ущерб</span>
        <span className={styles.info}>{damageLevel ? damageLevel : ''}</span>
      </div>
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
    </div>
  );
};

export default DamageLevelInfo;
