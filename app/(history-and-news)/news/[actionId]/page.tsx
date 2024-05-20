'use client';
import { notFound } from 'next/navigation';
import { getAction, getItemFromStorage } from '../../../../helpers';
import SingleAttackNews from '../../../../components/SingleAttackNews';
import {
  COMPLETED_ACTIONS,
} from '../../../../constants';

type Params = {
  params: {
    actionId: string;
  };
};

const SingleAttackNewsPage = ({ params: { actionId } }: Params) => {
  const actions = getItemFromStorage(COMPLETED_ACTIONS, window);
  const action = getAction(actionId, actions) as IAction | undefined;
  
  if (!action) notFound();

  return <SingleAttackNews news={action.news} />;
};

export default SingleAttackNewsPage;
