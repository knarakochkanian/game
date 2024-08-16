import { useEffect } from 'react';
import { selectIsAttacking } from '../redux/features/generalSlice';
import { useAppSelector } from '../redux/hooks';
import { getItemFromStorage } from '../helpers';
import { ATTACK, COMPLETED_ACTIONS, PROTECTION } from '../constants';
import { selectUpdateHistoryOrQueue } from '../redux/features/helpersSlice';
import { useRouter } from 'next/navigation';

const useGetHistoryActions = (setActions: TSetAction) => {
  const isAttacking = useAppSelector(selectIsAttacking);
  const updateHistoryOrQueue = useAppSelector(selectUpdateHistoryOrQueue);
  const navigate = useRouter();

  useEffect(() => {
    let filteredActions: IAction[] | undefined = [];

    if (typeof window !== 'undefined') {
      const storedActions: IAction[] | undefined = getItemFromStorage(
        COMPLETED_ACTIONS,
        window
      );
      if (isAttacking) {
        filteredActions = storedActions?.filter(
          (action) => action.actionType === ATTACK
        );
      } else {
        filteredActions = storedActions?.filter(
          (action) => action.actionType === PROTECTION
        );
      }

      if (filteredActions) {
        setActions(filteredActions);
      }

      if (filteredActions?.length === 0) navigate.push('/');
    }
  }, [isAttacking, updateHistoryOrQueue]);
};

export default useGetHistoryActions;
