import DamageLevelInfo from '../../common/DamageLevelInfo';
import IndustryAccordion from '../IndustryAccordion';
import RegionAccordion from '../RegionAccordion';

import styles from './SelectRegionAndIndustry.module.scss';

interface ISelectRegionAndIndustryProps {
  from?: string;
  regionOptions: IOption[];
  industryOptions: IOption[];
  action: IAttack | IProtection;
}

const SelectRegionAndIndustry = ({
  from = '',
  industryOptions,
  regionOptions,
  action,
}: ISelectRegionAndIndustryProps) => {
  return (
    <div className={styles.selectRegionAndIndustry}>
      <RegionAccordion />
      <IndustryAccordion />
      <DamageLevelInfo />
    </div>
  );
};

export default SelectRegionAndIndustry;

{
  /* <DropDown
        disabled={pagesWhereDropdownDisabled.includes(from)}
        title="Регион"
        name="region"
        options={regionOptions}
        initiallySelectedOption={action?.region}
      />
      <DropDown
        disabled={pagesWhereDropdownDisabled.includes(from)}
        optionsTitle="ВПК"
        title="Отрасль"
        name="industry"
        options={industryOptions}
        initiallySelectedOption={action?.industry}
      />
      <div className={styles.damage}>
        <TitleAndInfo info={action?.damage} title="Ущерб" />
      </div> */
}
