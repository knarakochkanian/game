'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ATTACK_OR_PROTECT } from '../../constants';
import {
  selectDamgeLevel,
  selectPickedCountriesObjects,
  setIsAttacking,
  setTotalPopulationRegions,
  selectFormattedFinancialLosses,
  setFormattedFinancialLosses,
} from '../../redux/features/generalSlice';

import styles from './SelectFromTwo.module.scss';

type setFirstActive = (bool: boolean) => void;

interface ISelectFromTwoProps {
  button_1: string;
  button_2: string;
  imgSrc_1: string;
  imgSrc_2: string;
  name?: string;
  setFirstActive?: setFirstActive;
}

const SelectFromTwo = ({
  button_1,
  button_2,
  imgSrc_1,
  imgSrc_2,
  name,
  setFirstActive,
}: ISelectFromTwoProps) => {
  const [disabledBtn, setDisabledBtn] = useState(2);
  const dispatch = useAppDispatch();

  const handleBtn_1_Click = () => {
    setDisabledBtn(2);
    if (name === ATTACK_OR_PROTECT) {
      dispatch(setIsAttacking(true));
    } else {
      (setFirstActive as setFirstActive)(true);
    }
  };

  const handleBtn_2_Click = () => {
    setDisabledBtn(1);
    if (name === ATTACK_OR_PROTECT) {
      dispatch(setIsAttacking(false));
    } else {
      (setFirstActive as setFirstActive)(false);
    }
  };
  const formatNumber = (number: number) => {
    const billion = 1000000000;
    return `${(number / billion).toFixed(0)} млрд $`;
  };
  const selectedCountries = useAppSelector(selectPickedCountriesObjects);
  const damageLevel = useAppSelector(selectDamgeLevel);
  const formattedFinancialLosses = useAppSelector(
    selectFormattedFinancialLosses
  );
  const damageLevelCount = () => {
    switch (damageLevel) {
      case 'Критический':
        return 0.4;
      case 'Минимальный':
        return 0.23;
      case 'Предупреждение':
        return 0.08;
      default:
        return 0;
    }
  };
  const totalPopulationRegions = selectedCountries.reduce((total, country) => {
    if (country.regions && country.regions.length > 0) {
      const regionsPopulation = country.regions.reduce((acc, region) => {
        return acc + (region.population || 0);
      }, 0);
      return total + regionsPopulation;
    } else {
      return total + (country.population || 0);
    }
  }, 0);
  dispatch(setTotalPopulationRegions(totalPopulationRegions));

  const financialLosses =
    3000 *
    totalPopulationRegions *
    0.2 *
    selectedCountries.length *
    damageLevelCount();
  // const formattedFinancialLosses = formatNumber(financialLosses);
  dispatch(setFormattedFinancialLosses(formatNumber(financialLosses)));
  return (
    <div className={`${styles.selectFromTwo} ${name ? styles[name] : ''}`}>
      <div className={styles.selectFromTwoAttack}>
        <div className={styles.selectFromTwoModalBottom}>
          <div>затронет населения</div>
          <h3>{totalPopulationRegions}</h3>
        </div>
        <div className={styles.selectFromTwoModalBottomRight}>
          <div>финансовые потери</div>
          <h3>{formattedFinancialLosses}</h3>
        </div>
        <button
          className={`${styles.button_1} ${
            disabledBtn === 1 ? styles.disabled : ''
          }`}
          onClick={handleBtn_1_Click}
        >
          {button_1}
        </button>
        <div>
          <Image
            onClick={handleBtn_1_Click}
            src={imgSrc_1}
            alt={'Icon'}
            width={88}
            height={88}
          />
          <Image
            onClick={handleBtn_2_Click}
            src={imgSrc_2}
            alt={'Icon'}
            width={88}
            height={88}
          />
        </div>
        <button
          className={`${styles.button_2} ${
            disabledBtn === 2 ? styles.disabled : ''
          }`}
          onClick={handleBtn_2_Click}
        >
          {button_2}
        </button>
      </div>
    </div>
  );
};

export default SelectFromTwo;
