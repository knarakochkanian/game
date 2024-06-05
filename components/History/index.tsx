'use client';

import { useState, useEffect } from 'react';
import Actions from '../Actions';
import ActionInDetails from '../ActionInDetails';
import { getItemFromStorage } from '../../helpers';
import { ATTACK, COMPLETED_ACTIONS, PROTECTION } from '../../constants';
import { useAppSelector } from '../../redux/hooks';
import { selectIsAttacking } from '../../redux/features/generalSlice';

import styles from './history.module.scss';

const History = () => {
  const isAttacking = useAppSelector(selectIsAttacking);
  const [actions, setActions] = useState<IAction[]>([]);
  const [actionId, setActionId] = useState('');

  useEffect(() => {
    let filteredActions: IAction[] | undefined = [];

    if (typeof window !== 'undefined') {
      const storedActions: IAction[] | undefined = getItemFromStorage(COMPLETED_ACTIONS, window);
      if (isAttacking) {
        filteredActions = storedActions?.filter((action) => action.actionType === ATTACK);
      } else {
        filteredActions = storedActions?.filter((action) => action.actionType === PROTECTION);
      }
      
      if (filteredActions) {
        setActions(filteredActions);
      }      
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
