import Image from 'next/image';
import { ATTACK } from '../../constants';
import Header from '../Header';
import SelectRegionAndIndustry from '../SelectRegionAndIndustry';
import ActionSelectedInfo from '../../common/AttackSelectedInfo';
import { attack } from '../../public/count-down';
import { protectionIcon } from '../../public/history';

import styles from './ActionCard.module.scss';

export interface IActionCardProps {
  setActionId?: TSetString;
  action: IAction;
  fromDetails?: boolean;
  industrySectors?: any[];
}

const ActionCard = ({ action, setActionId, fromDetails }: IActionCardProps) => {
  return (
    <article
      className={`${styles.actionCard} ${
        fromDetails ? styles.fromDetails : ''
      }`}
    >
      <Header
        fromDetails={fromDetails}
        action={action}
        setActionId={setActionId}
      />

      <SelectRegionAndIndustry action={action} />
      <ActionSelectedInfo
        fromDetails={fromDetails}
        setActionId={setActionId}
        action={action}
      />
      <Image
        className={styles.actionImg}
        src={action.actionType === ATTACK ? attack : protectionIcon}
        alt="action"
        width={38}
        height={38}
        priority
      />
    </article>
  );
};

export default ActionCard;
