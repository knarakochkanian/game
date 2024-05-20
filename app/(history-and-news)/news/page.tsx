import { Metadata } from 'next';
import News from '../../../components/News';

export const metadata: Metadata = {
  title: 'Новости',
  description: 'Влияние на мир',
};

const NewsPage = () => {
  return <News />;
};

export default NewsPage;
