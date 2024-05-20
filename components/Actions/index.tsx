import ActionCard from '../ActionCard';
import ActionInDetails from '../ActionInDetails';
import styles from './Actions.module.scss';

export interface IActionsProps {
  actions: IAction[];
  setActionId: TSetString;
  actionId?: string;
}

const Actions = ({ actions, setActionId, actionId }: IActionsProps) => {
  if(!actions) return <></>;

  return (
    <div className={styles.actions}>
      {actions.map((action, i) => {
        if (String(action.id) === actionId) {
          return (
            <ActionInDetails
              key={i}
              data={actions as IAction[]}
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
