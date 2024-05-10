import { Metadata } from 'next';
import RedirectHome from '../../../common/RedirectHome';

export const metadata: Metadata = {
  title: 'Новости',
  description: 'Влияние на мир',
};

const News = () => {
  return <RedirectHome />;
};

export default News;
