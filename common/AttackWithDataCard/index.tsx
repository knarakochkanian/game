'use client';

import Arrow from '../Arrow';
import GreenLineBorders from '../GreenLineBorders';
import { useEffect, useState } from 'react';
import useGetHistoryActions from '../../hooks/useGetHistoryActions';
import { useAppSelector } from '../../redux/hooks';
import { selectNewsActionId } from '../../redux/features/helpersSlice';

import styles from './AttackWithDataCard.module.scss';
import { selectIsAttacking } from '../../redux/features/generalSlice';
import { A_TTACK, P_ROTECTION } from '../../constants';

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
  const isAttacking = useAppSelector(selectIsAttacking);

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
      } ${isAttacking ? '' : styles.isProtecting}`}
    >
      <button onClick={onClick}>
        <p className={styles.attackName}>
          {isAttacking ? A_TTACK : P_ROTECTION} {name}
        </p>
        <p className={styles.attackDate}>{date}</p>
        <Arrow open={isActive} name="inAttackWithDataCard" />
        {isActive && <GreenLineBorders />}
      </button>
    </div>
  );
};

export default AttackWithDataCard;
