import Image from 'next/image';
import { arrowDown } from '../../public/summary';
import { slashes } from '../../public/history';

import styles from './AttackSelectedInfo.module.scss';
import { truncateString } from '../../helpers';

const AttackSelectedInfo = ({ attack }: { attack: IAttack }) => {
  return (
    <div className={styles.attackSelectedInfo}>
      <span>{truncateString(attack.region.label, 34)}</span>
      <span>{truncateString(attack.industry.label, 34)}</span>
      <Image
        className={styles.arrowDown}
        src={arrowDown}
        alt="arrowDown"
        width={24}
        height={24}
        priority
      />
      <Image
        className={styles.slashesFromBottom}
        src={slashes}
        alt="slashesFromBottom"
        width={150}
        height={24}
        priority
      />
    </div>
  );
};

export default AttackSelectedInfo;
