import DropDown from '../../common/DropDown';
import TitleAndInfo from '../../common/TitleAndInfo';
import { ONBOARDING } from '../../constants';
import industryOptions from '../../data/industryOptions';

import styles from './SelectRegionAndIndustry.module.scss';
import { regionOptionsUSA } from '../../data/USAdropdown';

const SelectRegionAndIndustry = ({ from = '' }: { from?: string }) => {
  return (
    <div className={styles.selectRegionAndIndustry}>
      <DropDown
        disabled={from === ONBOARDING}
        title="Регион"
        name="region"
        options={regionOptionsUSA}
      />
      <DropDown
        disabled={from === ONBOARDING}
        optionsTitle="ВПК"
        title="Отрасль"
        name="industry"
        options={industryOptions}
      />
      <div className={styles.damage}>
        <TitleAndInfo info="Критический" title="Ущерб" />
      </div>
    </div>
  );
};

export default SelectRegionAndIndustry;
