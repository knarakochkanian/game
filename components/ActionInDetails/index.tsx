import { HISTORY, QUEUE } from '../../constants';
import queue from '../../data/queue';
import { getAction } from '../../helpers';
import useGetPage from '../../hooks/useGetPage';
import ActionCard from '../ActionCard';
import ActionNews from '../ActionNews';
import LaunchConsequences from '../LaunchConsequences';

import styles from './ActionInDetails.module.scss';

interface IActionInDetailsProps {
  actionId: string;
  setActionId: TSetString;
  data: (IAttack | IProtection)[];
}

const ActionInDetails = ({
  actionId,
  setActionId,
  data,
}: IActionInDetailsProps) => {
  const page = useGetPage();
  let action = getAction(actionId, data as (IAttack | IProtection)[]);

  if (!action) return <></>;

  return (
    <section
      className={`${styles.action} ${page === QUEUE ? styles.inQueue : ''}`}
    >
      <ActionCard setActionId={setActionId} fromDetails action={action} />
      <LaunchConsequences
        from={HISTORY}
        action={action}
      />
      {page !== QUEUE && <ActionNews news={(action as IAttack).news} />}
    </section>
  );
};

export default ActionInDetails;
