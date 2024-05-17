import SelectRegionAndIndustry from '../SelectRegionAndIndustry';
import LaunchConsequences from '../LaunchConsequences';
import Header from '../Header';

import styles from './ActionDetails.module.scss';

const ActionDetails = ({ action }: { action: IAction }) => {
  return (
    <div className={styles.actionDetails}>
      <Header action={action} />
      <SelectRegionAndIndustry
        action={action}
      />
      <LaunchConsequences action={action} />
    </div>
  );
};

export default ActionDetails;
