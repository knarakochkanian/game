'use client';

import { useState } from 'react';
import Actions from '../Actions';

import styles from './Queue.module.scss';

const Queue = ({ queue }: { queue: (IAttack | IProtection)[] }) => {
  const [actionId, setActionId] = useState('');

  return (
    <>
      <h1 className={styles.title}>Задачи в очереди</h1>

      <Actions
        actionId={actionId}
        setActionId={setActionId}
        actions={queue}
      />
    </>
  );
};

export default Queue;
