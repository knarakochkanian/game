import Link from 'next/link';
import { HISTORY, NEWS } from '../../constants';

import styles from './HistoryAndNewsBtns.module.scss';

const HistoryAndNewsBtns = () => {
  return (
    <div className={styles.historyAndNewsBtns}>
      <Link href={HISTORY}>
        <button>история</button>
      </Link>
      <Link href={`/${NEWS}/3`}>
        <button>новости</button>
      </Link>
    </div>
  );
};

export default HistoryAndNewsBtns;
