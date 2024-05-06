import Image from 'next/image';
import { attack as attackImg } from '../../public/count-down';
import AttackSelectedInfo from '../../common/AttackSelectedInfo';
import { HISTORY } from '../../constants';
import launchHistoryIndustryOptions from '../../data/launchHistoryIndustryOptions';
import launchHistoryRegionOptions from '../../data/launchHistoryRegionOptions';
import Header from '../Header';
import SelectRegionAndIndustry from '../SelectRegionAndIndustry.tsx';
import styles from './AttackCard.module.scss';

export interface IAttackCardProps {
  setAttackId?: TSetString;
  attack: IAttack;
  fromDetails?: boolean;
}

const AttackCard = ({ attack, setAttackId, fromDetails }: IAttackCardProps) => {
  return (
    <article className={styles.attackCard}>
      <Header fromDetails={fromDetails} attack={attack} setAttackId={setAttackId} />

      <SelectRegionAndIndustry
        attack={attack}
        industryOptions={launchHistoryIndustryOptions}
        regionOptions={launchHistoryRegionOptions}
        from={HISTORY}
      />
      <AttackSelectedInfo
        fromDetails={fromDetails}
        setAttackId={setAttackId}
        attack={attack}
      />
      <Image
        className={styles.attackImg}
        src={attackImg}
        alt="attack"
        width={80}
        height={80}
        priority
      />
    </article>
  );
};

export default AttackCard;
