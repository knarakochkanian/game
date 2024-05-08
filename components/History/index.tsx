'use client';

import { useState } from 'react';
import Attacks from '../Attacks';
import AttackInDetails from '../AttackInDetails';

const History = ({ attacks }: { attacks: IAttack[] }) => {
  const [attackId, setAttackId] = useState('');

  return (
    <>
      {attackId ? (
        <AttackInDetails setAttackId={setAttackId} attackId={attackId} />
      ) : (
        <Attacks setAttackId={setAttackId} attacks={attacks} />
      )}
    </>
  );
};

export default History;
