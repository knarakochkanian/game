import Header from './Header';
import SelectRegionAndIndustry from '../SelectRegionAndIndustry.tsx';
import LaunchConsequences from '../LaunchConsequences';
import launchConsequences from '../../data/launchConsequences';

import styles from './AttackDetails.module.scss';


const AttackDetails = () => {
  return (
    <div className={styles.AttackDetails}>
      <Header />
      <SelectRegionAndIndustry />
      <LaunchConsequences launchConsequences={launchConsequences} />
    </div>
  );
};

export default AttackDetails;
