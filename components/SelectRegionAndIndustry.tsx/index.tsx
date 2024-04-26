import DropDown from '../../common/DropDown';
import TitleAndInfo from '../../common/TitleAndInfo';
import industryOptions from '../../data/industryOptions';
import regionOptionsUSA from '../../data/USAdropdown';

import styles from './SelectRegionAndIndustry.module.scss';


const SelectRegionAndIndustry = () => {
  return (
    <div className={styles.selectRegionAndIndustry}>
      <DropDown title="Регион" name="region" options={regionOptionsUSA} />
      <DropDown
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
