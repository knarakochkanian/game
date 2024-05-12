import SelectRegionAndIndustry from '../SelectRegionAndIndustry';
import LaunchConsequences from '../LaunchConsequences';
import industryOptions from '../../data/industryOptions';
import regionOptionsUSA from '../../data/USAdropdown';
import Header from '../Header';

import styles from './ActionDetails.module.scss';

const ActionDetails = ({
  from = '',
  action,
}: {
  from?: string;
  action: IAttack | IProtection;
}) => {
  return (
    <div className={`${styles.actionDetails} ${styles[from]}`}>
      <Header action={action} />
      <SelectRegionAndIndustry
        action={action}
        from={from}
        industryOptions={industryOptions}
        regionOptions={regionOptionsUSA}
      />
      <LaunchConsequences action={action} />
    </div>
  );
};

export default ActionDetails;
