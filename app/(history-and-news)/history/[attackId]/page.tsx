import { notFound } from 'next/navigation';
import AttackCard from '../../../../components/AttackCard';
import { getAttack } from '../../../../helpers';
import LaunchConsequences from '../../../../components/LaunchConsequences';
import { HISTORY } from '../../../../constants';
import AttackNews from '../../../../components/AttackNews';

import styles from './page.module.scss';

type Params = {
  params: {
    attackId: string;
  };
};

export async function generateMetadata({ params: { attackId } }: Params) {
  const attack = getAttack(attackId);

  if (!attack) {
    return {
      title: 'Attack Not Found',
    };
  }

  return {
    title: `Атака #${attack.name}`,
    description: `This is ${attack.name}'s page`,
  };
}

const AttackPage = ({ params: { attackId } }: Params) => {
  const attack = getAttack(attackId);

  if (!attack) notFound();

  return (
    <section className={styles.attack}>
      <AttackCard attack={attack} />
      <LaunchConsequences
        from={HISTORY}
        launchConsequences={attack.launchConsequences}
      />
      <AttackNews news={attack.news} />
    </section>
  );
};

export default AttackPage;
