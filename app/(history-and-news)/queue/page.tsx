import { Metadata } from 'next';
import queue from '../../../data/queue';
import Queue from '../../../components/Queue';

export const metadata: Metadata = {
  title: 'Задачи в очереди',
  description: 'Задачи в очереди',
};

const QueuePage = () => {
  return <Queue queue={queue} />;
};

export default QueuePage;
