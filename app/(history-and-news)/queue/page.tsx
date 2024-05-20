import { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: 'Задачи в очереди',
  description: 'Задачи в очереди',
};

const Queue = dynamic(() => import('../../../components/Queue'), {
  ssr: false,
});

const QueuePage = () => {
  return <Queue />;
};

export default QueuePage;
