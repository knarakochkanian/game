'use client';

import { notFound } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import Loading from '../Loading';
import AttacksWithDates from '../AttacksWithDates';
import SingleAttackNews from '../SingleAttackNews';
import { getAction } from '../../helpers';
import useGetHistoryActions from '../../hooks/useGetHistoryActions';
import { useAppSelector } from '../../redux/hooks';
import { selectNewsActionId } from '../../redux/features/helpersSlice';

import styles from './News.module.scss';

const News = () => {
  const idFromHistory = useAppSelector(selectNewsActionId);
  const [actions, setActions] = useState<IAction[]>([]);
  const [actionId, setActionId] = useState('');
  const [action, setAction] = useState<IAction | undefined>();

  useGetHistoryActions(setActions);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('actions', actions);
      console.log('action id:', actionId);

      const foundAction = getAction(actionId, actions) as IAction | undefined;
      setAction(foundAction);
    }
  }, [JSON.stringify(action), actionId]);

  useEffect(() => {
    if (!actions) return;

    const actionId = idFromHistory ? idFromHistory : String(actions[0]?.id);
    console.log('actions[0]?.id', actionId);

    setActionId(actionId);
  }, [JSON.stringify(actions)]);

  console.log('action', action);

  if (action === undefined) {
    return null;
  }

  if (!action) {
    notFound();
    return null;
  }

  return (
    <div className={styles.news}>
      <Suspense fallback={<Loading />}>
        <h1>Влияние на мир</h1>
        <div className={styles.container}>
          <AttacksWithDates
            actionId={actionId}
            setActionId={setActionId}
            attacks={actions}
          />
          <SingleAttackNews news={action.news} />
        </div>
      </Suspense>
    </div>
  );
};

export default News;
