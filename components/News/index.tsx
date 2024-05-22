'use client';

import { notFound } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import Loading from '../Loading';
import AttacksWithDates from '../AttacksWithDates';
import SingleAttackNews from '../SingleAttackNews';
import { getAction, getItemFromStorage } from '../../helpers';
import { COMPLETED_ACTIONS } from '../../constants';

import styles from './News.module.scss';

const News = () => {
  const [actions, setActions] = useState<IAction[]>([]);
  const [actionId, setActionId] = useState('');
  const [action, setAction] = useState<IAction | undefined>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedActions = getItemFromStorage(COMPLETED_ACTIONS, window);

      const foundAction = getAction(actionId, actions) as IAction | undefined;
      setActions(storedActions);
      setAction(foundAction);
    }
  }, [JSON.stringify(action), actionId]);

  useEffect(() => {
    if(!actions) return;
    setActionId(String(actions[0]?.id));
  }, [JSON.stringify(actions)]);

  console.log('action', action);

  if (action === undefined) {
    return null; // Render nothing until action is set
  }

  if (!action) {
    notFound();
    return null; // This ensures notFound is called
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
