import Image from 'next/image';
import { arrowDown } from '../../public/summary';
import { slashes } from '../../public/history';
import { IAttackCardProps } from '../../components/AttackCard';

import styles from './AttackSelectedInfo.module.scss';

const AttackSelectedInfo = ({
  attack,
  setAttackId,
  fromDetails,
}: IAttackCardProps) => {
  return (
    <div className={styles.attackSelectedInfo}>
      <span>{attack.region.label}</span>
      <span>{attack.industry.label}</span>

      <button onClick={() => setAttackId(fromDetails ? '' : attack.id)}>
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
      </button>
    </div>
  );
};

export default AttackSelectedInfo;
