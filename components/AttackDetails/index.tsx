import SelectRegionAndIndustry from '../SelectRegionAndIndustry.tsx';
import LaunchConsequences from '../LaunchConsequences';
import industryOptions from '../../data/industryOptions';
import regionOptionsUSA from '../../data/USAdropdown';
import Header from '../Header';

import styles from './AttackDetails.module.scss';

const AttackDetails = ({
  from = '',
  attack,
}: {
  from?: string;
  attack: IAttack;
}) => {
  return (
    <div className={`${styles.attackDetails} ${styles[from]}`}>
      <Header attack={attack} />
      <SelectRegionAndIndustry
        attack={attack}
        from={from}
        industryOptions={industryOptions}
        regionOptions={regionOptionsUSA}
      />
      <LaunchConsequences launchConsequences={attack.launchConsequences} />
    </div>
  );
};

export default AttackDetails;
