import { notFound } from 'next/navigation';
import { getAction } from '../../../../helpers';
import SingleAttackNews from '../../../../components/SingleAttackNews';
import attacks from '../../../../data/attacks';

type Params = {
  params: {
    attackId: string;
  };
};

export async function generateMetadata({ params: { attackId } }: Params) {
  const attack = getAction(attackId, attacks);

  if (!attack) {
    return {
      title: 'Attack Not Found',
    };
  }

  return {
    title: `Атака #${attack.name} - Новости`,
    description: `This is ${attack.name}'s page`,
  };
}

const SingleAttackNewsPage = ({ params: { attackId } }: Params) => {
  const attack = getAction(attackId, attacks) as IAction | undefined;

  if (!attack) notFound();

  return <SingleAttackNews news={attack.news} />;
};

export default SingleAttackNewsPage;
