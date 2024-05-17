'use client';

import { useState } from 'react';
import Actions from '../Actions';
import ActionInDetails from '../ActionInDetails';
import { getItemFromStorage } from '../../helpers';
import { COMPLETED_ACTIONS } from '../../constants';

import styles from './history.module.scss';

const History = () => {
  const actions = getItemFromStorage(COMPLETED_ACTIONS);
  const [actionId, setActionId] = useState('');

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
