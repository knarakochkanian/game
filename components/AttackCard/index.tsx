import Image from 'next/image';
import { attack as attackImg } from '../../public/count-down';
import AttackSelectedInfo from '../../common/AttackSelectedInfo';
import { HISTORY } from '../../constants';
import launchHistoryIndustryOptions from '../../data/launchHistoryIndustryOptions';
import launchHistoryRegionOptions from '../../data/launchHistoryRegionOptions';
import Header from '../Header';
import SelectRegionAndIndustry from '../SelectRegionAndIndustry.tsx';
import styles from './AttackCard.module.scss';

const AttackCard = ({ attack }: { attack: IAttack }) => {
  return (
    <article className={styles.attackCard}>
      <Header attack={attack} />
      <SelectRegionAndIndustry
        attack={attack}
        industryOptions={launchHistoryIndustryOptions}
        regionOptions={launchHistoryRegionOptions}
        from={HISTORY}
      />
      <AttackSelectedInfo attack={attack} />
      <Image className={styles.attackImg} src={attackImg} alt="attack" width={80} height={80} priority />
    </article>
  );
};

export default AttackCard;
