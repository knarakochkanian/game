import Header from './Header';
import SelectRegionAndIndustry from '../SelectRegionAndIndustry.tsx';
import LaunchConsequences from '../LaunchConsequences';
import launchConsequences from '../../data/launchConsequences';

import styles from './AttackDetails.module.scss';

const AttackDetails = ({ from = '' }: { from?: string }) => {
  return (
    <div className={`${styles.attackDetails} ${styles[from]}`}>
      <Header />
      <SelectRegionAndIndustry from={from} />
      <LaunchConsequences launchConsequences={launchConsequences} />
    </div>
  );
};

export default AttackDetails;
