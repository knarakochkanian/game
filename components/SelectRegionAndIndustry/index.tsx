import DamageLevelInfo from '../../common/DamageLevelInfo';
import IndustryAccordion from '../IndustryAccordion';
import RegionAccordion from '../RegionAccordion';

import './Accordion.scss';
import styles from './SelectRegionAndIndustry.module.scss';

interface ISelectRegionAndIndustryProps {
  action: IAction;
}

const SelectRegionAndIndustry = ({ action }: ISelectRegionAndIndustryProps) => {
  if (!action) return;
  const { selectedCountries, industrySectors, damageLevel } = action;

  return (
    <div className={styles.selectRegionAndIndustry}>
      <RegionAccordion selectedCountries={selectedCountries} />
      <IndustryAccordion industrySectors={industrySectors} />
      <DamageLevelInfo damageLevel={damageLevel} />
    </div>
  );
};

export default SelectRegionAndIndustry;
