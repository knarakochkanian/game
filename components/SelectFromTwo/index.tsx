'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ATTACK_OR_PROTECT } from '../../constants';
import {
  selectDamgeLevel,
  selectPickedCountriesObjects,
  setIsAttacking,
  setTotalPopulationRegionsAffected,
  setTotalPopulationRegions,
  selectFormattedFinancialLosses,
  setFormattedFinancialLosses,
  selectIsAttacking,
  resetGeneralState,
  selectSectors,
} from '../../redux/features/generalSlice';
import { formatNumberWithSpaces } from '../../helpers/formatedNumber';
import { setEventModalId } from '../../redux/features/helpersSlice';

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
  const isAttacking = useAppSelector(selectIsAttacking);

  const handleBtn_1_Click = () => {
    setDisabledBtn(2);
    if (name === ATTACK_OR_PROTECT) {
      if (!isAttacking) {
        dispatch(resetGeneralState());
        dispatch(setEventModalId(-1));
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
        dispatch(setEventModalId(-1));
        dispatch(setIsAttacking(false));
      }
    } else {
      (setFirstActive as setFirstActive)(false);
    }
  };

  const formatNumber = (number: number) => {
    const billion = 1000000000;
    const roundedNumber = Math.ceil(number / (billion / 10)) / 10;
    return `${roundedNumber.toFixed(1).replace('.', ',')}`;
  };

  const selectedCountries = useAppSelector(selectPickedCountriesObjects);
  const sectorsIndustry = useAppSelector(selectSectors);
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
        return acc + (region.isSelected ? region.population ?? 0 : 0);
      }, 0);
      return total + regionsPopulation;
    } else {
      return total + (country.isSelected ? country.population ?? 0 : 0);
    }
  }, 0);
  dispatch(setTotalPopulationRegions(totalPopulationRegions));

  const selectedOptionsN = useMemo(() => {
    return sectorsIndustry
      ?.flatMap((sector) => sector.options)
      .filter((option) => option.selected)
      .reduce((sum, option) => sum + (option.n ?? 0), 0);
  }, [sectorsIndustry]);

  const capitalization = useMemo(() => {
    return (
      sectorsIndustry
        ?.find((sector) => sector.title === 'Топ капитализаций компаний')
        ?.options.filter((option) => option.selected)
        .reduce((sum, option) => sum + (option.capitalization ?? 0), 0) ?? 0
    );
  }, [sectorsIndustry]);

  const financialLosses =
    totalPopulationRegions > 0
      ? 3000 *
          totalPopulationRegions *
          0.2 *
          selectedOptionsN *
          damageLevelCount() +
        capitalization * damageLevelCount()
      : capitalization * damageLevelCount();
  dispatch(setFormattedFinancialLosses(formatNumber(financialLosses)));

  const affectedRegions =
    totalPopulationRegions > 0 && selectedOptionsN > 0
      ? Math.ceil(
          totalPopulationRegions *
            (selectedOptionsN / 399.5) *
            damageLevelCount() *
            2.5
        )
      : 0;
  dispatch(setTotalPopulationRegionsAffected(affectedRegions));

  // @ts-ignore
  return (
    <div className={`${styles.selectFromTwo} ${name ? styles[name] : ''}`}>
      <div className={styles.selectFromTwoAttack}>
        {!!affectedRegions && (
          <div className={styles.selectFromTwoModalBottom}>
            {isAttacking ? (
              <div>затронет населения</div>
            ) : (
              <div>защищено населения</div>
            )}
            <h3>{formatNumberWithSpaces(affectedRegions)}</h3>
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
              {
                // @ts-ignore
                formatNumberWithSpaces(formattedFinancialLosses)
              }{' '}
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
