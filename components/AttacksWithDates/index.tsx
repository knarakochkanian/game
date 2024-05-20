'use client';

import { useEffect, useState } from 'react';
import AttackWithDataCard from '../../common/AttackWithDataCard';
import useGetPage from '../../hooks/useGetPage';

import styles from './AttacksWithDates.module.scss';

const AttacksWithDates = ({ attacks }: { attacks: IAction[] }) => {
  const attackId = useGetPage();

  const [activeAttackId, setActiveAttackId] = useState<string>(
    attackId as string
  );

  useEffect(() => {
    setActiveAttackId(attackId as string);
  }, [attackId]);

  if (!attacks) return <></>;

  return (
    <div className={styles.attacksWithDates}>
      {attacks.map((attack) => (
        <AttackWithDataCard
          id={String(attack.id)}
          onClick={() => setActiveAttackId(String(attack.id))}
          key={attack.name}
          isActive={String(attack.id) === activeAttackId}
          date={attack.date}
          name={attack.name}
        />
      ))}
    </div>
  );
};

export default AttacksWithDates;
