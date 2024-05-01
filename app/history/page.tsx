import { Metadata } from 'next';
import Attacks from '../../components/Attacks';
import attacks from '../../data/attacks';

export const metadata: Metadata = {
  title: 'История запусков',
  description: 'История запусков',
};

const History = () => {
  return <Attacks attacks={attacks} />;
};

export default History;
