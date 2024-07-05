'use client';

import Arrow from '../Arrow';
import GreenLineBorders from '../GreenLineBorders';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import styles from './AttackWithDataCard.module.scss';
import useGetHistoryActions from '../../hooks/useGetHistoryActions';
import { useAppSelector } from '../../redux/hooks';
import { selectNewsActionId } from '../../redux/features/helpersSlice';

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
  const idFromHistory = useAppSelector(selectNewsActionId);
  const [actions, setActions] = useState<IAction[]>([]);

  useGetHistoryActions(setActions);

  useEffect(() => {
    const actionId = idFromHistory ? idFromHistory : String(actions[0]?.id);

    if (id === actionId) {
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
        <p className={styles.attackName}>Атака {name}</p>
        <p className={styles.attackDate}>{date}</p>
        <Arrow open={isActive} name="inAttackWithDataCard" />
        {isActive && <GreenLineBorders />}
      </button>
    </div>
  );
};

export default AttackWithDataCard;
