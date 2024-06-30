'use client';

import { useState, useEffect } from 'react';
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
  selectIsAttacking,
  resetGeneralState,
} from '../../redux/features/generalSlice';
import { formatNumberWithSpaces } from '../../helpers/formatedNumber';

import styles from './SelectFromTwo.module.scss';

type setFirstActive = (bool: boolean) => void;

interface ISelectFromTwoProps {
  button_1: string;
  button_2: string;
  imgSrc_1: string;
  imgSrc_2: string;
  name?: string;
  setFirstActive?: setFirstActive;
  isTopCapitalization: boolean;
  options: {
    capitalization: number;
    n: number;
    companies: Array<{
      selected: boolean;
      name: string;
      capitalization: number;
      n: number;
    }>;
  };
}

const SelectFromTwo = ({
  button_1,
  button_2,
  imgSrc_1,
  imgSrc_2,
  name,
  setFirstActive,
  isTopCapitalization,
  options,
}: ISelectFromTwoProps) => {
  const [disabledBtn, setDisabledBtn] = useState(2);
  const [selectedCompanies, setSelectedCompanies] = useState(
    options?.companies
  );

  const dispatch = useAppDispatch();
  const isAttacking = useAppSelector(selectIsAttacking);

  useEffect(() => {
    if (isTopCapitalization) {
      dispatch(setFormattedFinancialLosses(formatNumber(totalCapitalization)));
    } else {
      dispatch(setFormattedFinancialLosses(formatNumber(financialLosses)));
    }
  }, [isTopCapitalization, dispatch]);

  const handleBtn_1_Click = () => {
    setDisabledBtn(2);
    if (name === ATTACK_OR_PROTECT) {
      if (!isAttacking) {
        dispatch(resetGeneralState());
        dispatch(setIsAttacking(true));
      }
    } else {
      (setFirstActive as setFirstActive)(true);
    }
  };

  const handleBtn_2_Click = () => {
    setDisabledBtn(1);
    if (name === ATTACK_OR_PROTECT) {
      if (isAttacking) {
        dispatch(resetGeneralState());
        dispatch(setIsAttacking(false));
      }
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

  const n = 1;

  const totalPopulationRegions = selectedCountries.reduce((total, country) => {
    if (country.regions && country.regions.length > 0) {
      const regionsPopulation = country.regions.reduce((acc, region) => {
        return acc + (region.isSelected ? region.population ?? 0 : 0);
      }, 0);

      return total + regionsPopulation;
    } else {
      return total + (country.isSelected ? country.population ?? 0 : 0);
    }
  }, 0);

  useEffect(() => {
    dispatch(setTotalPopulationRegions(totalPopulationRegions));
  }, [totalPopulationRegions, dispatch]);

  const financialLosses =
    3000 * totalPopulationRegions * 0.2 * n * damageLevelCount();

  useEffect(() => {
    dispatch(setFormattedFinancialLosses(formatNumber(financialLosses)));
  }, [financialLosses, dispatch]);

  const calculateTotalCapitalization = () => {
    const selectedCompanies = options?.companies.filter(
      (company) => company.selected
    );
    return selectedCompanies?.reduce((total, company) => {
      return company.capitalization * company.n;
    }, 0);
  };

  const totalCapitalization = calculateTotalCapitalization();

  return (
    <div className={`${styles.selectFromTwo} ${name ? styles[name] : ''}`}>
      <div className={styles.selectFromTwoAttack}>
        {selectedCountries.length > 0 && (
          <div className={styles.selectFromTwoModalBottom}>
            {isAttacking ? (
              <div>затронет населения</div>
            ) : (
              <div>защищено населения</div>
            )}
            <h3>{formatNumberWithSpaces(totalPopulationRegions)}</h3>
          </div>
        )}
        {damageLevel && (
          <div className={styles.selectFromTwoModalBottomRight}>
            {isAttacking ? (
              <div>финансовые потери</div>
            ) : (
              <div>сохранено финансов</div>
            )}
            <h3>
              {formatNumberWithSpaces(
                isTopCapitalization
                  ? totalCapitalization
                  : parseInt(formattedFinancialLosses.replace(/[^\d]/g, ''))
              )}{' '}
              млрд $
            </h3>
          </div>
        )}
        <button
          className={`${styles.button_1} ${
            disabledBtn === 1 ? styles.disabled : ''
          }`}
          onClick={handleBtn_1_Click}
        >
          {button_1}
        </button>
        <div style={{ display: 'flex' }}>
          <Image
            onClick={handleBtn_1_Click}
            src={imgSrc_1}
            alt={'Icon'}
            width={41}
            height={41}
          />
          <Image
            onClick={handleBtn_2_Click}
            src={imgSrc_2}
            alt={'Icon'}
            width={41}
            height={41}
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
