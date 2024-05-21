'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ModalData from '../../common/Modals/ModalData';
import CountOnboarding from '../Count-onboarding';
import {
  COUNT_DOWN,
  LAUNCH_CONSEQUENCES,
  PROTECTION,
  SUMMARY,
  citiesUnderAttack,
  consequencesParagraph,
  populationSuffering,
  wholeDamage,
} from '../../constants';
import { formatNumber } from '../../helpers';
import Modal from '../../common/Modals/Modal';
import Paragraph from '../../common/Paragraph';
import useGetPage from '../../hooks/useGetPage';
import { UseMap } from '../Map/use-map.hook';
import { MapType } from '../Map/map.types';

import '../../app/globals.scss';
import styles from './LaunchConsequences.module.scss';

import {
  selectFormattedFinancialLosses,
  selectPickedCountries,
  selectPickedCountriesObjects,
  selectTotalPopulationRegions,
} from '../../redux/features/generalSlice';
import { useAppSelector } from '../../redux/hooks';

import { selectComfirmedFromOnboarding } from '../../redux/features/generalSlice';
import { StaticMap } from '../Map/StaticMap.component';

interface ILaunchConsequencesProps {
  action: IAction;
  from?: string;
  setLearningStart: TSetBoolean;
  learningStart: boolean;
}

const LaunchConsequences = ({
  action,
  setLearningStart,
  learningStart,
  from = '',
}: ILaunchConsequencesProps) => {
  const currentPage = useGetPage();
  const fromOnboarding = useAppSelector(selectComfirmedFromOnboarding);
  const [paragraphIsOpen, setparagraphIsOpen] = useState(false);
  const [onboardingPassed, setOnboardingPassed] = useState(false);
  const [isCountDownComponent, setIsCountDownComponent] = useState(false);

  const totalPopulationRegions = useAppSelector(selectTotalPopulationRegions);
  const totalSettlements = useAppSelector(selectPickedCountriesObjects);
  const formattedFinancialLosses = useAppSelector(
    selectFormattedFinancialLosses
  );
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isOnboardingPassed =
        window.localStorage.getItem('isOnboardingPassed') === 'true';
      setOnboardingPassed(isOnboardingPassed);
    }
  }, []);
  if (!action) return;

  const completeOnboarding = () => {
    if (typeof window !== 'undefined') {
      setOnboardingPassed(true);
      window.localStorage.setItem('isOnboardingPassed', 'true');
    }
  };
  const headerGoToCountComponent = () => {
    setLearningStart(true);
    // setIsCountDownComponent(true);
  };

  const notInteractiveMap = UseMap({
    onCountryPicked: () => {},
    mapType: MapType.plane,
    isNotInteractive: true,
  });

  return isCountDownComponent ? (
    <CountOnboarding />
  ) : (
    <>
      <div
        className={`${styles.launchConsequences} ${
          paragraphIsOpen ? styles.paragraphIsOpen : ''
        } ${from} ${styles[from]}`}
      >
        <div
          className={`${styles.info} ${
            action.actionType === PROTECTION ? styles.protectMode : ''
          }`}
        >
          <h3 className={styles.title}>Последствия запуска</h3>
          <Paragraph
            isOpen={fromOnboarding ? false : paragraphIsOpen}
            setIsOpen={setparagraphIsOpen}
            content={consequencesParagraph}
          />
          <div className={styles.dataContainer}>
            <ModalData
              from={LAUNCH_CONSEQUENCES}
              name={citiesUnderAttack}
              value={totalSettlements.reduce(
                (total, item) => total + (item.settlements || 0),
                0
              )}
            />
            <ModalData
              from={LAUNCH_CONSEQUENCES}
              name={populationSuffering}
              value={totalPopulationRegions}
            />
            <ModalData
              from={LAUNCH_CONSEQUENCES}
              name={wholeDamage}
              value={formattedFinancialLosses}
            />
          </div>
        </div>
        <div className={styles.imgAndModal}>
          <Modal
            name="damageInfo"
            isOpen={
              currentPage === SUMMARY
                ? fromOnboarding
                  ? true
                  : false
                : learningStart
                  ? false
                  : true
            }
            counter={10}
          >
            <p>
              {' '}
              В данном окне отображается информация об уроне, который будет
              нанесен выбранным вами регионам, а также о последствиях атаки.
            </p>
            <div className="ModalButtons">
              <button
                onClick={headerGoToCountComponent}
                style={{ color: 'white', padding: '20px' }}
                className="ModalButton1"
              >
                далее
              </button>
              <Link href={'/'} className="SecondarySmall">
                <span className="TypoBodyBigLink">
                  <button onClick={completeOnboarding}>пропустить</button>
                </span>
              </Link>
            </div>
          </Modal>

          <div
            className={styles.map}
            style={{
              width: '1048px !important',
              height: '542px !important',
            }}
          >
            <StaticMap pickedCountries={['США', 'Канада']} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LaunchConsequences;
