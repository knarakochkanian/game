'use client';

import Link from 'next/link';
import Arrow from '../Arrow';
import GreenLineBorders from '../GreenLineBorders';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import styles from './AttackWithDataCard.module.scss';

interface IAttackWithDataCardProps {
  name: string;
  date: string;
  isActive: boolean;
  onClick: () => void;
  id: string;
}

const AttackWithDataCard = ({
  name,
  date,
  isActive,
  onClick,
  id,
}: IAttackWithDataCardProps) => {
  const navigate = useRouter();

  useEffect(() => {

    if (id === '3') {
      onClick();
    }
  }, []);

  return (
    <div
      className={`${styles.attackWithDataCard} ${
        isActive ? styles.isActive : ''
      }`}
    >
      <button onClick={onClick}>
        <p className={styles.attackName}>{name}</p>
        <p className={styles.attackDate}>{date}</p>
        <Arrow open={isActive} name="inAttackWithDataCard" />
        {isActive && <GreenLineBorders />}
      </button>
    </div>
  );
};

export default AttackWithDataCard;
