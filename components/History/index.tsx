'use client';

import { useState } from 'react';
import Actions from '../Actions';
import ActionInDetails from '../ActionInDetails';
import useGetHistoryActions from '../../hooks/useGetHistoryActions';

import styles from './history.module.scss';

const History = () => {
  const [actions, setActions] = useState<IAction[]>([]);
  const [actionId, setActionId] = useState('');

  useGetHistoryActions(setActions);

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
