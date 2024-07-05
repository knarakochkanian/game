import { HISTORY, QUEUE } from '../../constants';
import { getAction } from '../../helpers';
import useGetPage from '../../hooks/useGetPage';
import ActionCard from '../ActionCard';
import ActionNews from '../ActionNews';
import LaunchConsequences from '../LaunchConsequences';

import styles from './ActionInDetails.module.scss';

interface IActionInDetailsProps {
  actionId: string;
  setActionId: TSetString;
  data: IAction[];
}

const ActionInDetails = ({
  actionId,
  setActionId,
  data,
}: IActionInDetailsProps) => {
  const page = useGetPage();
  let action = getAction(actionId, data as IAction[]);

  if (!action || !data) return <></>;

  return (
    <section
      className={`${styles.action} ${page === QUEUE ? styles.inQueue : ''}`}
    >
      <ActionCard setActionId={setActionId} fromDetails action={action} />
      <LaunchConsequences
        from={HISTORY}
        action={action}
      />
      {page !== QUEUE && <ActionNews id={actionId} news={(action as IAction).news} />}
    </section>
  );
};

export default ActionInDetails;
