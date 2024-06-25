'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Grid from '../../common/Grid';
import { attack } from '../../public/count-down';
import SideLines from '../../common/SideLines';
import SummaryFooter from '../../components/SummaryFooter';
import BackAndForwardBtns from '../../common/BackAndForwardBtns';
import { protectionIcon } from '../../public/history';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  resetGeneralState,
  selectAttackTime,
  selectComfirmedFromOnboarding,
  selectCurrentAction,
  selectIsAttacking,
  setClickOnboardingCount,
  setClickOnboardingSummary,
  setCurrentActionDate,
} from '../../redux/features/generalSlice';
import { ACTIONS_IN_QUEUE, COUNT_DOWN } from '../../constants';
import { formatDate, getItemFromStorage } from '../../helpers';
import Modal from '../../common/Modals/Modal';

import styles from './summary.module.scss';
import './summary-onboarding.css';

import scrollImg from '../../public/onboarding/summary-onboarding-scroll.svg';
import trashImg from '../../public/onboarding/summary-onboarding-trash.svg';
import mapImg from '../../public/onboarding/onboarding-summary-map.png';
import { backArrow, backBtnShape } from '../../public/summary';
import {
  forwardArrow,
  forwardBtnShape,
} from '../../public/summary';
import { useSelector } from 'react-redux';

const ActionDetails = dynamic(() => import('../../components/ActionDetails'), {
  ssr: false,
});

const SummaryOnBoarding = () => {
  const [learningStart, setLearningStart] = useState(true);
  const dispatch = useAppDispatch();
  const [actionsInQueueFromStorage, setActionsInQueueFromStorage] = useState<
    IAction[] | undefined
  >();
  const router = useRouter();
  const isAttacking = useAppSelector(selectIsAttacking);
  const currentAction: IAction | null = useAppSelector(selectCurrentAction);
  const fromOnboarding = useAppSelector(selectComfirmedFromOnboarding);

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const actionsInQueueFromStorage = getItemFromStorage(
  //       ACTIONS_IN_QUEUE,
  //       window
  //     );
  //     setActionsInQueueFromStorage(actionsInQueueFromStorage);
  //   }
  // }, []);
  const [modalState, setModalState] = useState({
    10: true,
    11: false,
  });
  function forwardClick() {
    dispatch(setClickOnboardingSummary(false));
    dispatch(setClickOnboardingCount(true));
    setModalState({
      10: false,
      11: false,
    })
  }
  const timeObject = useSelector(selectAttackTime);

  return (
    <main className={styles.main}>
      <div style={{filter: modalState['10'] ? '' : 'blur(22px)'}} className={styles.imgCtn}>
          <Image 
            src={mapImg}
            alt={'earth map'}
            width={490}
            height={255}
            style={{
              position: 'absolute',
              zIndex: "-6",
              right: "-32px",
              filter: "blur(22px)",
              bottom: "39px",
            }}
          />
        <div className='summary-onboarding-header'>
          <p className='summary-onboarding-header__attack'>
            Атака #000-001
          </p>
          <p className='summary-onboarding-header__pusk'>
            отложенный запуск
            <div className='pusk-helper-1'></div>
            <div className='pusk-helper-2'></div>
          </p>
          <Image 
            src={scrollImg}
            alt={'scroll'}
            width={56}
            height={11}
            style={{
              marginRight: '11.3px',
            }}
          />
          <p style={{textTransform: 'uppercase', marginRight: '11.3px'}} className='summary-onboarding-header__right-text'>будет выполнена</p>
          <p style={{marginRight: '11.3px'}} className='summary-onboarding-header__right-text'>{timeObject.date}</p>
          <p style={{marginRight: '19px'}} className='summary-onboarding-header__right-text'>в {timeObject.time}</p>
          <Image 
            src={trashImg}
            width={23}
            height={23}
            alt={'trash'}
          />
        </div>
        <div className='summary-onboarding-info'>
          <div className='summary-onboarding-info__item'>
            <p className='summary-onboarding-info__item-title'>Регион</p>
            <p className='summary-onboarding-info__item-count'>1</p>
            <Image
              src={'onboarding/arrow.svg'}
              alt={'arrow'}
              width={11}
              height={11}
              style={{
                position: 'absolute',
                right: '25px',
              }}
            />
          </div>
          <div className='summary-onboarding-info__item'>
            <p className='summary-onboarding-info__item-title'>Отрасль</p>
            <p className='summary-onboarding-info__item-count'>1</p>
            <Image
              src={'onboarding/arrow.svg'}
              alt={'arrow'}
              width={11}
              height={11}
              style={{
                position: 'absolute',
                right: '25px',
              }}
            />
          </div>
          <div className='summary-onboarding-info__item'>
            <p className='summary-onboarding-info__item-title'>Ущерб</p>
            <p className='summary-onboarding-info__item-count'>Критический</p>
          </div>
        </div>
        <div className='summary-onboarding-consequences'>
          <p className='summary-onboarding-consequences__title'>Последствия запуска</p>
          <p className='summary-onboarding-consequences__text'>
            Военно-промышленный подвергнется крупной DDoS-атаке: в атаке на 44 завода будет задействовано 104 000 хакеров, которые будут д...
          </p>
          <Image
              src={'onboarding/arrow.svg'}
              alt={'arrow'}
              width={11}
              height={11}
              style={{
                position: "absolute",
                top: "63px",
                right: "15px",
              }}
            />
            <div className='summary-onboarding-consequences__info-wrapper'>
              <p className='summary-onboarding-consequences__info-left-text'>Будет затронуто городов</p>
              <p className='summary-onboarding-consequences__info-right-text'>20</p>
            </div>
            <div className='summary-onboarding-consequences__info-wrapper'>
              <p className='summary-onboarding-consequences__info-left-text'>Пострадает населения</p>
              <p className='summary-onboarding-consequences__info-right-text'>19 937 180</p>
            </div>
            <div className='summary-onboarding-consequences__info-wrapper'>
              <p className='summary-onboarding-consequences__info-left-text'>Прогноз ущерба на сумму</p>
              <p className='summary-onboarding-consequences__info-right-text'>12 млн $</p>
            </div>
        </div>
      </div>
      <div className='back-forward-buttons'>
        <button className={styles.onBackBtn}>
          <Image
            src={backArrow}
            className={styles.backArrow}
            alt="backArrow"
            width={45}
            height={45}
            priority
          />
          <Image
            src={backBtnShape}
            className={styles.backBtnShape}
            alt="backBtnShape"
            width={77}
            height={331}
            priority
          />
          <span>НАЗАД</span>
        </button>
        <button onClick={forwardClick}>
          <Image
            onClick={forwardClick}
            src={forwardArrow}
            className={styles.forwardArrow}
            alt="forwardArrow"
            width={45}
            height={45}
            priority
          />

          <Image
            onClick={forwardClick}
            src={forwardBtnShape}
            className={styles.forwardBtnShape}
            alt="forwardBtnShape"
            width={65}
            height={331}
            priority
          />
        </button>
      </div>
      {/* <BackAndForwardBtns onBack={onBack} onForward={onForward} /> */}
      <Grid />
      <SideLines />

      <SummaryFooter onClick={() => {}} />
      {(
        <div
          style={{backdropFilter: modalState['11'] ? 'blur(0px)' : 'blur(22px)', filter: modalState['11'] ? 'blur(0px)' : 'blur(22px)',}}
          className={`${styles.blur} ${learningStart ? styles.z_15 : ''}`}
        ></div>
      )}
      <Modal name="learningStart" isOpen={modalState["10"]} counter={10}>
        <p>
          В данном окне отображается информация об уроне, который будет нанесен выбранным вами регионам, а также о последствиях атаки.
        </p>
        <div className="ModalButtons">
            <button
              className={'ModalButton1'}
              onClick={() => {setModalState({
                10: false,
                11: true,
              })}}
            >
              далее
            </button>
          <Link href={'/'} className="SecondarySmall">
            <span className="TypoBodyBigLink">
              <button onClick={() => {}}>пропустить</button>
            </span>
          </Link>
        </div>
      </Modal>
      <Modal name="learningStart" isOpen={modalState['11']} counter={11}>
        <p>
          Для запуска задачи нужно нажать физическую кнопку “Пуск”,
          расположенную правее от дисплея.
        </p>
        <div className="ModalButtons">
          <button
            onClick={forwardClick}
            style={{ color: 'white', padding: '0px', textDecoration: 'none', textTransform: 'uppercase',
              fontSize: "13.18px",
              fontWeight: "500",
              lineHeight: "15.82px",
              letterSpacing: "0.01em",
              textAlign: "left",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
               }}
            className="ModalButton1"
          >
            далее
          </button>
          <Link href={'/'} className="SecondarySmall">
            <span className="TypoBodyBigLink">
              <button>пропустить</button>
            </span>
          </Link>
        </div>
      </Modal>
    </main>
  );
};

export default SummaryOnBoarding;
