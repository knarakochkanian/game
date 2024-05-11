'use client';

import { useState } from 'react';
import Actions from '../Actions';
import ActionInDetails from '../ActionInDetails';

import styles from './history.module.scss';

interface IHistoryProps {
  attacks: IAttack[];
}

const History = ({ attacks }: IHistoryProps) => {
  const [attackId, setAttackId] = useState('');

  return (
    <>
      <h1 className={styles.title}>История запусков</h1>
      {attackId ? (
        <ActionInDetails
          data={attacks}
          actionId={attackId}
          setActionId={setAttackId}
        />
      ) : (
        <Actions setActionId={setAttackId} actions={attacks} />
      )}
    </>
  );
};

export default History;
