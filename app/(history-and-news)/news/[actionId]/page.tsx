'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { getAction, getItemFromStorage } from '../../../../helpers';
import SingleAttackNews from '../../../../components/SingleAttackNews';
import { COMPLETED_ACTIONS } from '../../../../constants';

type Params = {
  params: {
    actionId: string;
  };
};

const SingleAttackNewsPage = ({ params: { actionId } }: Params) => {
  const [action, setAction] = useState<IAction | undefined>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const actions = getItemFromStorage(COMPLETED_ACTIONS, window);
      const fetchedAction = getAction(actionId, actions) as IAction | undefined;
      setAction(fetchedAction);
    }
  }, [actionId]);

  if (action === undefined) {
    return null; // Render nothing until action is set
  }

  if (!action) {
    notFound();
    return null; // This ensures notFound is called
  }

  return <SingleAttackNews news={action.news} />;
};

export default SingleAttackNewsPage;
