'use client';

import { useState, useEffect } from 'react';
import Actions from '../Actions';
import ActionInDetails from '../ActionInDetails';
import { getItemFromStorage } from '../../helpers';
import { COMPLETED_ACTIONS } from '../../constants';

import styles from './history.module.scss';

const History = () => {
  const [actions, setActions] = useState([]);
  const [actionId, setActionId] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedActions = getItemFromStorage(COMPLETED_ACTIONS, window);
      setActions(storedActions);
    }
  }, []);

  return (
    <>
      <h1 className={styles.title}>История запусков</h1>
      {actionId ? (
        <ActionInDetails
          data={actions}
          actionId={actionId}
          setActionId={setActionId}
        />
      ) : (
        <Actions setActionId={setActionId} actions={actions} />
      )}
    </>
  );
};

export default History;
