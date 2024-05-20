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
      navigate.push('/news/3');
    }
  }, []);

  return (
    <div
      className={`${styles.attackWithDataCard} ${
        isActive ? styles.isActive : ''
      }`}
    >
      <Link href={`/news/${id}`} onClick={onClick}>
        <p className={styles.attackName}>{name}</p>
        <p className={styles.attackDate}>{date}</p>
        <Arrow open={isActive} name="inAttackWithDataCard" />
        {isActive && <GreenLineBorders />}
      </Link>
    </div>
  );
};

export default AttackWithDataCard;
