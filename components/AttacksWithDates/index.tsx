'use client';

import { useEffect } from 'react';
import AttackWithDataCard from '../../common/AttackWithDataCard';

import styles from './AttacksWithDates.module.scss';

const AttacksWithDates = ({
  attacks,
  setActionId,
  actionId
}: {
  attacks: IAction[];
  setActionId: TSetString;
  actionId: string
}) => {

  useEffect(() => {
    setActionId(actionId as string);
  }, [actionId]);

  if (!attacks) return <></>;

  return (
    <div className={styles.attacksWithDates}>
      {attacks.map((attack) => (
        <AttackWithDataCard
          id={String(attack.id)}
          onClick={() => setActionId(String(attack.id))}
          key={attack.name}
          isActive={String(attack.id) === actionId}
          date={attack.date}
          name={attack.name}
        />
      ))}
    </div>
  );
};

export default AttacksWithDates;
