'use client';
import { notFound } from 'next/navigation';
import { getAction, getItemFromStorage } from '../../../../helpers';
import SingleAttackNews from '../../../../components/SingleAttackNews';
import {
  ATTACK,
  A_TTACK,
  COMPLETED_ACTIONS,
  P_ROTECTION,
} from '../../../../constants';

type Params = {
  params: {
    actionId: string;
  };
};

// export async function generateMetadata({ params: { actionId } }: Params) {
//   const actions = getItemFromStorage(COMPLETED_ACTIONS);
//   const action = getAction(actionId, actions);

//   if (!action) {
//     return {
//       title: 'Action Not Found',
//     };
//   }

//   return {
//     title: `${action.actionType === ATTACK ? A_TTACK : P_ROTECTION} #${
//       action.name
//     } - Новости`,
//     description: `This is ${action.name}'s page`,
//   };
// }

const SingleAttackNewsPage = ({ params: { actionId } }: Params) => {
  const actions = getItemFromStorage(COMPLETED_ACTIONS);
  const action = getAction(actionId, actions) as IAction | undefined;
  console.log(888888888);
  
  if (!action) notFound();

  return <SingleAttackNews news={action.news} />;
};

export default SingleAttackNewsPage;
