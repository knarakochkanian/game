'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { noiseMap } from '../../public/summary';
import ModalData from '../../common/Modals/ModalData';
import CountOnboarding from '../Count-onboarding';
import {
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

interface ILaunchConsequencesProps {
  action: IAction;
  from?: string;
}

const LaunchConsequences = ({
  action,
  from = '',
}: ILaunchConsequencesProps) => {
  const currentPage = useGetPage();
  const [paragraphIsOpen, setparagraphIsOpen] = useState(false);
  const [onboardingPassed, setOnboardingPassed] = useState(false);
  const [isCountDownComponent, setIsCountDownComponent] = useState(false);
  useEffect(() => {
    const isOnboardingPassed =
      localStorage.getItem('isOnboardingPassed') === 'true';
    setOnboardingPassed(isOnboardingPassed);
  }, []);
  if (!action) return;

  const completeOnboarding = () => {
    setOnboardingPassed(true);
    localStorage.setItem('isOnboardingPassed', 'true');
  };
  const headerGoToCountComponent = () => {
    setIsCountDownComponent(true);
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
            isOpen={paragraphIsOpen}
            setIsOpen={setparagraphIsOpen}
            content={consequencesParagraph}
          />
          <div className={styles.dataContainer}>
            <ModalData
              from={LAUNCH_CONSEQUENCES}
              name={citiesUnderAttack}
              value={String(action.launchConsequences.citiesUnderAttack)}
            />
            <ModalData
              from={LAUNCH_CONSEQUENCES}
              name={populationSuffering}
              value={formatNumber(
                String(action.launchConsequences.populationSuffering)
              )}
            />
            <ModalData
              from={LAUNCH_CONSEQUENCES}
              name={wholeDamage}
              value={String(action.launchConsequences.wholeDamage) + ' млн $'}
            />
          </div>
        </div>
        <div>
          <Modal
            name="damageInfo"
            isOpen={currentPage === SUMMARY ? false : true}
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
            // style={{
            //   width: '1048px',
            //   height: '542px',
            // }}
            // ref={notInteractiveMap.ref}
          ></div>
        </div>
      </div>
    </>
  );
};

export default LaunchConsequences;
