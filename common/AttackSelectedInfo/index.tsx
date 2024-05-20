import Image from 'next/image';
import { arrowDown, arrowUp } from '../../public/summary';
import { slashes } from '../../public/history';
import { IActionCardProps } from '../../components/ActionCard';
import { findFirstSectorWithSelectedOption } from '../../helpers';

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
    setActionId(fromDetails ? '' : String(action.id));
  };

  return (
    <div
      className={`${styles.actionSelectedInfo} ${
        fromDetails ? styles.fromDetails : ''
      }`}
    >
      <span>{action.selectedCountries[0].name}</span>
      <span>
        {
          findFirstSectorWithSelectedOption(action.industrySectors)
            .firstSelectedOption?.name
        }
      </span>

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
