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
  if (!actionsInQueueFromStorage) return <></>;

  return (
    <div className={styles.queueModal}>
      <h5>Очередь задач</h5>
      <div>
        {[0, 1].map((num) => (
          <span
            key={num}
            className={
              actionsInQueueFromStorage[num]?.actionType === ATTACK
                ? styles.attack
                : styles.protection
            }
          >
            {actionsInQueueFromStorage[num]?.actionType === ATTACK
              ? ATTACK
              : PROTECTION}
            {actionsInQueueFromStorage[num]?.name}
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
