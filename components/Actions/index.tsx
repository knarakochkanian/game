import ActionCard from '../ActionCard';
import ActionInDetails from '../ActionInDetails';
import styles from './Actions.module.scss';

export interface IActionsProps {
  actions: (IAttack | IProtection)[];
  setActionId: TSetString;
  actionId?: string;
}

const Actions = ({ actions, setActionId, actionId }: IActionsProps) => {
  return (
    <div className={styles.actions}>
      {actions.map((action, i) => {
        if (action.id === actionId) {
          return (
            <ActionInDetails
              key={i}
              data={actions as (IAttack | IProtection)[]}
              actionId={actionId}
              setActionId={setActionId}
            />
          );
        } else {
          return (
            <ActionCard setActionId={setActionId} key={i} action={action} />
          );
        }
      })}
    </div>
  );
};

export default Actions;
