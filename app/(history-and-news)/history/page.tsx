import { Metadata } from 'next';
import History from '../../../components/History';

export const metadata: Metadata = {
  title: 'История запусков',
  description: 'История запусков',
};

const HistoryPage = () => {
  return <History />;
};

export default HistoryPage;
