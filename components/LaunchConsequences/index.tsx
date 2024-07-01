'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector } from '../../redux/hooks';
import { selectCurrentAction } from '../../redux/features/generalSlice';
import ModalData from '../../common/Modals/ModalData';
import CountOnboarding from '../Count-onboarding';
import Modal from '../../common/Modals/Modal';
import Paragraph from '../../common/Paragraph';
import useGetPage from '../../hooks/useGetPage';
import { UseMap } from '../Map/use-map.hook';
import { MapType } from '../Map/map.types';
import { StaticMap } from '../Map/StaticMap.component';
import { ConsequencesParagraph as getConsequencesData } from '../../data/consequencesParagraph';
import '../../app/globals.scss';
import styles from './LaunchConsequences.module.scss';
import {
  COUNT_DOWN,
  LAUNCH_CONSEQUENCES,
  ONBOARDING,
  PROTECTION,
  SUMMARY,
  citiesUnderAttack,
  populationSuffering,
  wholeDamage,
} from '../../constants';
import { formatNumberWithSpaces } from '../../helpers/formatedNumber';
import {
  selectDamgeLevel,
  selectFormattedFinancialLosses,
  selectPickedCountries,
  selectPickedCountriesObjects,
  selectTotalPopulationRegions,
  selectComfirmedFromOnboarding,
  setBlur,
} from '../../redux/features/generalSlice';

// Define types for props
interface IAction {
  actionType: string;
}

interface ILaunchConsequencesProps {
  action: IAction;
  from?: string;
  setLearningStart?: (value: boolean) => void;
  learningStart?: boolean;
}

// Define ConsequenceLevels type
interface ConsequenceLevels {
  critical: string;
  minimal: string;
  warning: string;
}

// Define TopCapitalizationLevels type
interface TopCapitalizationLevels {
  [company: string]: ConsequenceLevels;
}

// Define ConsequencesParagraph type
interface ConsequencesParagraph {
  [key: string]: ConsequenceLevels | TopCapitalizationLevels;
}

// Define the component with proper typing
const LaunchConsequences: React.FC<ILaunchConsequencesProps> = ({
  action,
  setLearningStart,
  learningStart,
  from = '',
}) => {
  const currentPage = useGetPage();
  const fromOnboarding = useAppSelector(selectComfirmedFromOnboarding);
  const [paragraphIsOpen, setParagraphIsOpen] = useState(false);
  const [onboardingPassed, setOnboardingPassed] = useState(false);
  const [isCountDownComponent, setIsCountDownComponent] = useState(false);
  const pickedCountries = useAppSelector(selectPickedCountries);
  const totalPopulationRegions = useAppSelector(selectTotalPopulationRegions);
  const totalSettlements = useAppSelector(selectPickedCountriesObjects);
  const formattedFinancialLosses = useAppSelector(
    selectFormattedFinancialLosses
  );
  const damageLevel = useAppSelector(selectDamgeLevel);
  const industrySectors = useAppSelector(selectCurrentAction);

  const consequencesData = getConsequencesData();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isOnboardingPassed =
        window.localStorage.getItem('isOnboardingPassed') === 'true';
      setOnboardingPassed(isOnboardingPassed);
    }
  }, []);

  if (!action) return null;

  const completeOnboarding = () => {
    if (typeof window !== 'undefined') {
      setOnboardingPassed(true);
      window.localStorage.setItem('isOnboardingPassed', 'true');
    }
  };

  const headerGoToCountComponent = () => {
    if (setLearningStart) {
      setLearningStart(true);
    }
  };

  const renderConsequences = (
    consequences: ConsequencesParagraph,
    damageLevel: string
  ) => {
    if (!consequences) {
      return <p>No consequences data available</p>;
    }

    console.log('Damage Level:', damageLevel);
    console.log('Consequences Data:', consequences);

    return Object.keys(consequences).map((key) => {
      const consequence = consequences[key] as ConsequenceLevels;
      let paragraph;

      switch (damageLevel) {
        case 'Критический':
          paragraph = consequence.critical;
          break;
        case 'Минимальный':
          paragraph = consequence.minimal;
          break;
        case 'Предупреждение':
          paragraph = consequence.warning;
          break;
        default:
          paragraph = '';
      }

      console.log('Key:', key, 'Paragraph:', paragraph);

      return (
        <div key={key}>
          <p>{paragraph}</p>
        </div>
      );
    });
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
        className={`${styles.launchConsequences} ${paragraphIsOpen ? styles.paragraphIsOpen : ''} ${from} ${styles[from]}`}
      >
        <div
          className={`${styles.info} ${action.actionType === PROTECTION ? styles.protectMode : ''}`}
        >
          <h3 className={styles.title}>Последствия запуска</h3>
          <Paragraph
            isOpen={fromOnboarding ? false : paragraphIsOpen}
            setIsOpen={setParagraphIsOpen}
            content={renderConsequences(consequencesData, damageLevel)}
          />
          <div className={styles.dataContainer}>
            <ModalData
              from={LAUNCH_CONSEQUENCES}
              name={citiesUnderAttack}
              value={formatNumberWithSpaces(
                totalSettlements.reduce(
                  (total, item) => item.settlements || 0,
                  19937180
                )
              )}
            />
            <ModalData
              from={LAUNCH_CONSEQUENCES}
              name={populationSuffering}
              value={formatNumberWithSpaces(totalPopulationRegions)}
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
              currentPage !== ONBOARDING ? !!fromOnboarding : !learningStart
            }
            counter={10}
          >
            <p>
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
                  <button onClick={completeOnboarding}>пропус</button>
                </span>
              </Link>
            </div>
          </Modal>
          <div className={styles.map}>
            {currentPage === SUMMARY && fromOnboarding ? (
              <Image
                src={'/onboarding/noise.png'}
                alt={'img'}
                width={1048}
                height={542}
                style={{
                  filter: 'blur(22px)',
                  position: 'absolute',
                  zIndex: '-1',
                }}
              />
            ) : (
              <div
                style={{
                  width: '1048px !important',
                  height: '542px !important',
                }}
              >
                <StaticMap pickedCountries={pickedCountries} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LaunchConsequences;
