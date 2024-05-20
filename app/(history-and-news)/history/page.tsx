import dynamic from 'next/dynamic';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'История запусков',
  description: 'История запусков',
};

const History = dynamic(() => import('../../../components/History'), {
  ssr: false,
});

const HistoryPage = () => {
  return <History />;
};

export default HistoryPage;
