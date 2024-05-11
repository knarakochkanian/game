import Image from 'next/image';
import { arrowDown, arrowUp } from '../../public/summary';
import { slashes } from '../../public/history';
import { IActionCardProps } from '../../components/ActionCard';

import styles from './ActionSelectedInfo.module.scss';

const ActionSelectedInfo = ({
  action,
  setActionId,
  fromDetails,
}: IActionCardProps) => {
  const handleClick = () => {
    if (!setActionId) {
      return;
    }
    setActionId(fromDetails ? '' : action.id);
  };

  return (
    <div
      className={`${styles.actionSelectedInfo} ${
        fromDetails ? styles.fromDetails : ''
      }`}
    >
      <span>{action.region.label}</span>
      <span>{action.industry.label}</span>

      <button onClick={handleClick}>
        <Image
          className={styles.arrow}
          src={fromDetails ? arrowUp : arrowDown}
          alt="arrow"
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

export default ActionSelectedInfo;
