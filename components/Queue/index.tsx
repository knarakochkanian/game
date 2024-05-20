'use client';

import { useState } from 'react';
import Actions from '../Actions';
import { getItemFromStorage } from '../../helpers';
import { ACTIONS_IN_QUEUE } from '../../constants';

import styles from './Queue.module.scss';

const Queue = () => {
  const actionsInQueue = getItemFromStorage(ACTIONS_IN_QUEUE, window);
  const [actionId, setActionId] = useState('');

  return (
    <>
      <h1 className={styles.title}>Задачи в очереди</h1>

      <Actions
        actionId={actionId}
        setActionId={setActionId}
        actions={actionsInQueue}
      />
    </>
  );
};

export default Queue;
