import { notFound } from 'next/navigation';
import { getAttack } from '../../../../helpers';
import SingleAttackNews from '../../../../components/SingleAttackNews';

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
    title: `Атака #${attack.name} - Новости`,
    description: `This is ${attack.name}'s page`,
  };
}

const SingleAttackNewsPage = ({ params: { attackId } }: Params) => {
  const attack = getAttack(attackId);

  if (!attack) notFound();

  return <SingleAttackNews news={attack.news} />;
};

export default SingleAttackNewsPage;
