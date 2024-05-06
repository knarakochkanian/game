import { Metadata } from 'next';
import attacks from '../../../data/attacks';
import History from '../../../components/History';

export const metadata: Metadata = {
  title: 'История запусков',
  description: 'История запусков',
};

const HistoryPage = () => {
  return <History attacks={attacks} />;
};

export default HistoryPage;
