import Link from 'next/link';
import Image from 'next/image';
import { ACTIONS_IN_QUEUE, ATTACK, PROTECTION, QUEUE } from '../../constants';
import { slashes_90_degree } from '../../public/main-screen';
import { getItemFromStorage } from '../../helpers';

import styles from './QueueModal.module.scss';

const QueueModal = () => {
  const actionsInQueueFromStorage = getItemFromStorage(
    ACTIONS_IN_QUEUE,
    window
  );
  if (!actionsInQueueFromStorage || actionsInQueueFromStorage.length < 1)
    return <></>;

  return (
    <div className={styles.queueModal}>
      <h5>Очередь задач</h5>
      <div>
        {actionsInQueueFromStorage.map((action: any, index: number) => (
          <span
            key={index}
            className={
              action.actionType === ATTACK ? styles.attack : styles.protection
            }
          >
            {action.actionType === ATTACK ? ATTACK : PROTECTION}
            {action.name}
          </span>
        ))}
      </div>
      <Link href={QUEUE}>показать все</Link>
      <Image
        className={styles.slashes_90_degree}
        src={slashes_90_degree}
        alt="slashes_90_degree"
        width={11}
        height={71}
        priority
      />
    </div>
  );
};

export default QueueModal;
