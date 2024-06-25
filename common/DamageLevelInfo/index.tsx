import React from 'react';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { minusSign } from '../../public/main-screen';
import styles from './DamageLevelInfo.module.scss';
import { resetDamageLevel } from '../../redux/features/generalSlice';

const DamageLevelInfo = ({ damageLevel }: { damageLevel: string }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(resetDamageLevel());
  };

  return (
    <div
      className={
        damageLevel ? styles.damageLevelInfo : styles.damageLevelInfoDisable
      }
    >
      <div className={styles.titleAndInfo}>
        <span className={styles.title}>Ущерб</span>
        <span className={styles.info}>{damageLevel ? damageLevel : ''}</span>
      </div>
      <button className='damage-level-info__button' onClick={handleRemove}>
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
