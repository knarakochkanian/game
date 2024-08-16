'use client';

import { useState, useEffect } from 'react';
import Actions from '../Actions';
import { getItemFromStorage } from '../../helpers';
import { ACTIONS_IN_QUEUE } from '../../constants';
import { useAppSelector } from '../../redux/hooks';
import { selectUpdateHistoryOrQueue } from '../../redux/features/helpersSlice';

import styles from './Queue.module.scss';

const Queue = () => {
  const updateQueueActions = useAppSelector(selectUpdateHistoryOrQueue);
  const [actionsInQueue, setActionsInQueue] = useState([]);
  const [actionId, setActionId] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const actions = getItemFromStorage(ACTIONS_IN_QUEUE, window);
      setActionsInQueue(actions);
    }
  }, [updateQueueActions]);

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
