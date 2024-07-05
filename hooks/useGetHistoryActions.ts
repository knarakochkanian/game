import { useEffect } from "react";
import { selectIsAttacking } from "../redux/features/generalSlice";
import { useAppSelector } from "../redux/hooks";
import { getItemFromStorage } from "../helpers";
import { ATTACK, COMPLETED_ACTIONS, PROTECTION } from "../constants";

const useGetHistoryActions = (setActions: TSetAction) => {
    const isAttacking = useAppSelector(selectIsAttacking);
  
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
      }, [isAttacking]);
}

export default useGetHistoryActions
