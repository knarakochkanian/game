import SelectRegionAndIndustry from '../SelectRegionAndIndustry';
import LaunchConsequences from '../LaunchConsequences';
import Header from '../Header';

import styles from './ActionDetails.module.scss';

interface IActionDetailsProps {
  action: IAction;
  learningStart: boolean;
  setLearningStart: TSetBoolean;
}

const ActionDetails = ({
  action,
  learningStart,
  setLearningStart,
}: IActionDetailsProps) => {
  return (
    <div
      className={`${styles.actionDetails} ${learningStart ? styles.z_11 : ''}`}
    >
      <Header action={action} />
      <SelectRegionAndIndustry action={action} />
      <LaunchConsequences
        learningStart={learningStart}
        setLearningStart={setLearningStart}
        action={action}
      />
    </div>
  );
};

export default ActionDetails;
