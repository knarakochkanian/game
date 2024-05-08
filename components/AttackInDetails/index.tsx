import { HISTORY } from '../../constants';
import { getAttack } from '../../helpers';
import AttackCard from '../AttackCard';
import AttackNews from '../AttackNews';
import LaunchConsequences from '../LaunchConsequences';

import styles from './AttackInDetails.module.scss';

interface IAttackInDetailsProps {
  attackId: string;
  setAttackId: TSetString;
}

const AttackInDetails = ({ attackId, setAttackId }: IAttackInDetailsProps) => {
  const attack = getAttack(attackId) as IAttack;

  return (
    <section className={styles.attack}>
      <AttackCard setAttackId={setAttackId} fromDetails attack={attack} />
      <LaunchConsequences
        from={HISTORY}
        launchConsequences={attack.launchConsequences}
      />
      <AttackNews news={attack.news} />
    </section>
  );
};

export default AttackInDetails;
