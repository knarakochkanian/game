'use client';

import { useEffect, useState } from 'react';
import AttackWithDataCard from '../../common/AttackWithDataCard';
import useGetPage from '../../hooks/useGetPage';

import styles from './AttacksWithDates.module.scss';

const AttacksWithDates = ({ attacks }: { attacks: IAttack[] }) => {
  const attackId = useGetPage();

  const [activeAttackId, setActiveAttackId] = useState<string>(attackId as string);

  useEffect(() => {
    setActiveAttackId(attackId as string);
  }, [attackId]);

  return (
    <div className={styles.attacksWithDates}>
      {attacks.map((attack) => (
        <AttackWithDataCard
          id={attack.id}
          onClick={() => setActiveAttackId(attack.id)}
          key={attack.name}
          isActive={attack.id === activeAttackId}
          date={attack.date}
          name={attack.name}
        />
      ))}
    </div>
  );
};

export default AttacksWithDates;
