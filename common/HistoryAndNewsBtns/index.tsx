import Link from 'next/link';
import { useState } from 'react';
import { HISTORY, NEWS } from '../../constants';
import useGetHistoryActions from '../../hooks/useGetHistoryActions';

import styles from './HistoryAndNewsBtns.module.scss';

const HistoryAndNewsBtns = () => {
  const [actions, setActions] = useState<IAction[]>([]);

  useGetHistoryActions(setActions);

  return (
    <div className={styles.historyAndNewsBtns}>
      <Link href={HISTORY}>
        <div>
          <button>история</button>
          <button className={styles.historyCount}>{actions.length}</button>
        </div>
      </Link>
      <Link href={NEWS}>
        <button>новости</button>
      </Link>
    </div>
  );
};

export default HistoryAndNewsBtns;
