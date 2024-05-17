import { Metadata } from 'next';
import Queue from '../../../components/Queue';

export const metadata: Metadata = {
  title: 'Задачи в очереди',
  description: 'Задачи в очереди',
};

const QueuePage = () => {
  return <Queue />;
};

export default QueuePage;
