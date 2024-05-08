'use client';

import { useState } from 'react';
import AttackWithDataCard from '../../common/AttackWithDataCard';
import styles from './AttacksWithDates.module.scss';

const AttacksWithDates = ({ attacks }: { attacks: IAttack[] }) => {
  const [activeAttackName, setActiveAttackName] = useState<string>(
    attacks[0].name
  );

  return (
    <div className={styles.attacksWithDates}>
      {attacks.map((attack) => (
        <AttackWithDataCard
          id={attack.id}
          onClick={() => setActiveAttackName(attack.name)}
          key={attack.name}
          isActive={attack.name === activeAttackName}
          date={attack.date}
          name={attack.name}
        />
      ))}
    </div>
  );
};

export default AttacksWithDates;
