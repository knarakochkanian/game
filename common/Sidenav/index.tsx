'use client';
import React, { useEffect, useState } from 'react';
import styles from './Sidenav.module.scss';
import Image from 'next/image';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Modal from '../Modals/Modal';
import {
  selectIsAttacking,
  setAttackTime,
  setBlur,
  setComfirmedFromOnboarding,
  setCurrentAction,
  setIsAttacking,
  setClickOnboardingSummary,
  selectClickOnboardingSummary,
  selectClickOnboardingCount,
} from '../../redux/features/generalSlice';
import Link from 'next/link';
import zIndex from '@mui/material/styles/zIndex';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ATTACK, ATTACK_OR_PROTECT, CRITICAL } from '../../constants';
import { attack } from '../../public/count-down';
import { protectionIcon } from '../../public/history';
import launchConsequences from '../../data/launchConsequences';
import industry, { defaultSectorsSelection } from '../../data/industryData';
import USA from '../../data/countriesWithCodes';

import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/system';
import { useSelector } from 'react-redux';
import SummaryOnBoarding from '../../app/summary-onboarding/page';
import CountDownOnboarding from '../../app/count-down-onboarding/page';
import { useNTP } from '../../contexts/NTPDateContext';
interface SidenavProps {
  isOpen?: boolean;
  onClose?: () => void;
  sx?: SxProps<Theme>;
  vpkSelected?: boolean;
  theGorgeSelected?: boolean;
  addConfirm?: boolean;
  delayed?: boolean;
  removeModalDate?: boolean;
  accordionWrapperIndustry: any;
  accordionWrapperDamage: any;
}

function Sidenav({
  isOpen,
  onClose,
  sx,
  vpkSelected,
  theGorgeSelected,
  addConfirm,
  delayed,
  removeModalDate,
  accordionWrapperIndustry,
  accordionWrapperDamage
}: SidenavProps) {
  const dispatch = useAppDispatch();
  const isAttacking = useAppSelector(selectIsAttacking);
  const isClickOnBoardingSummary = useSelector(selectClickOnboardingSummary);
  const isClickOnBoardingCount = useSelector(selectClickOnboardingCount);
  // const handleBtn_1_Click = () => {
  //   if (name === ATTACK_OR_PROTECT) {
  //     dispatch(setIsAttacking(true));
  //   } else {
  //     (setFirstActive as setFirstActive)(true);
  //   }
  // };
  function goOnboardingSummary() {
    dispatch(setClickOnboardingSummary(true));
  }
  const onSetCurrentAction = () => {
    const currentAction: IAction = {
      pickedCountries: [],
      actionType: ATTACK,
      news: [],
      launchConsequences,
      id: 1,
      damageLevel: CRITICAL,
      date: '05.10.2024 12:30',
      industrySectors: defaultSectorsSelection,
      isCompleted: false,
      name: '#000-001',
      selectedCountries: USA,
    };

    dispatch(setComfirmedFromOnboarding(true));
    dispatch(setCurrentAction(currentAction));
  };
  const [currentDate, setCurrentDate] = useState('');
  const [futureTime, setFutureTime] = useState("");
  const [opacityConfirm, setOpacityConfirm] = useState('1');
  const { getDate } = useNTP()

  useEffect(() => {
    console.log(removeModalDate);
    console.log(delayed);
    if (!removeModalDate && delayed) {
      setOpacityConfirm('0');
    }
    if (removeModalDate && delayed) {
      setOpacityConfirm('1');
    }
  }, [removeModalDate, delayed])

  useEffect(() => {
    const now = getDate();
    if(now !== null) {
      const dateString = new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(now);
      setCurrentDate(dateString);
    }
  }, [getDate])

  useEffect(() => {
    function updateDateTime() {
      const now = getDate();
      if (now !== null) {
        const futureTime = new Date(now.getTime() + 10 * 60000); // Добавляем 10 минут (10 * 60 * 1000 миллисекунд)
        const timeString = new Intl.DateTimeFormat('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
        }).format(futureTime);
        setFutureTime(timeString);
      }
    }
    const timerId = setInterval(updateDateTime, 1000);
    return () => {
      clearInterval(timerId);
      const now = getDate();
      if (now !== null) {
        const futureTime = new Date(now.getTime() + 10 * 60000); // Добавляем 10 минут (10 * 60 * 1000 миллисекунд)
        const timeString = new Intl.DateTimeFormat('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
        }).format(futureTime);
        const dateString = new Intl.DateTimeFormat('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }).format(now);
        dispatch(setAttackTime({
          date: dateString,
          time: timeString,
        }));
      }
      console.log('component Sidenav unmounted')
    };
  }, [getDate])

  return (
    <>
      {isClickOnBoardingSummary && <SummaryOnBoarding />}
      {isClickOnBoardingCount && <CountDownOnboarding />}
      <Box
        sx={sx}
        id="mySidenav"
        className={styles.sidenav}
        style={{ width: isOpen ? '328px' : '0', opacity: isClickOnBoardingCount ? '0' : '1' }}
      >
        <div className={styles.sidenavWrapper}>
          <Image
            style={{ opacity: delayed ? '0' : '1' }}
            src={isAttacking ? attack : protectionIcon}
            alt="actionSign"
            className={styles.actionSign}
            width={38}
            height={38}
          />
          <div
            style={{
              display: delayed ? 'none' : 'flex',
            }}
            className={styles.sidenavTitle}
          >
            {isAttacking ? (
              <>
                <h2 className='sidenav__title'>Атака #000-001</h2>
                <Image
                  src="home/basket.svg"
                  alt="basket"
                  width={23}
                  height={23}
                />
              </>
            ) : (
              <>
                <Image
                  src="history/protectionIcon.svg"
                  alt="basket"
                  width={48}
                  height={48}
                />
              </>
            )}
          </div>

          <div className="AccordionsWrap">
            <Accordion
              style={{ color: delayed ? '#0F0F0F' : 'none' }}
              defaultExpanded
              disabled
              sx={(theme) => ({
                backgroundColor: 'rgba(0, 0, 0, 0.87) !important',
                color: '#FFF',
                marginBottom: '10px',
              })}
            >
              <AccordionSummary
                expandIcon={
                  <Image
                    src={'onboarding/arrow.svg'}
                    alt={'arrow'}
                    width={11}
                    height={11}
                  />
                }
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{
                  display: delayed ? 'none' : 'flex',
                  alignItems: 'center',
                  padding: "0",
                }}
              >
                <div className={`${styles.sidenavAccordionSummary} accordion-wrapper-region`}>
                  <h3 className='accordion-summary-title'>Регион</h3>
                  <span className='accordion-summary-count'>1</span>
                </div>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  padding: '0',
                }}
              >
                <h4 className='accordion-details-title'>США</h4>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={vpkSelected}
              disabled={vpkSelected}
              style={{ color: delayed ? '#0F0F0F' : 'none' }}
              sx={(theme) => ({
                backgroundColor: 'rgba(0, 0, 0, 0.87) !important',
                color: '#FFF',
                marginBottom: '10px',
              })}
            >
              <AccordionSummary
                expandIcon={
                  <Image
                    src={'onboarding/arrow.svg'}
                    alt={'arrow'}
                    width={11}
                    height={11}
                  />
                }
                sx={{
                  display: delayed ? 'none' : 'flex',
                  padding: '0',
                }}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <div className={`${styles.sidenavAccordionSummary} ${accordionWrapperIndustry}`}>
                  <h3 className='accordion-summary-title'>Отрасль</h3>
                  <span className='accordion-summary-count'>1</span>
                </div>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  padding: '0',
                }}
              >
                {' '}
                {vpkSelected && <h4 className='accordion-details-title'>ВПК</h4>}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={theGorgeSelected}
              disabled={theGorgeSelected}
              style={{ color: delayed ? '#0F0F0F' : 'none' }}
              sx={(theme) => ({
                backgroundColor: 'rgba(0, 0, 0, 0.87) !important',
                color: '#FFF',
                marginBottom: '10px',
              })}
            >
              <AccordionSummary
                expandIcon={
                  <Image
                    src={'onboarding/arrow.svg'}
                    alt={'arrow'}
                    width={11}
                    height={11}
                  />
                }
                sx={{
                  display: delayed ? 'none' : 'flex',
                  padding: '0',
                }}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <div className={`${styles.sidenavAccordionSummary} ${accordionWrapperDamage}`}>
                  <h3 className='accordion-summary-title'>Ущерб</h3>
                </div>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  padding: '0',
                }}
              >
                {theGorgeSelected && <h3 className='accordion-details-title'>Критический </h3>}
              </AccordionDetails>
            </Accordion>
          </div>

          <div
            className={styles.sidenavSquare}
            style={{ display: removeModalDate ? 'none' : 'flex', zIndex: 10, marginTop: '40px', }}
          >
            <h5
              style={{
                color: delayed ? 'white' : '#787878',
                paddingLeft: '0px',
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "19.21px",
                letterSpacing:" 0.03em",
                textAlign: "left",
              }}
            >
              Отложенный запуск
            </h5>
            {delayed ? (
              <Image
                src={'/onboarding/Toggle.svg'}
                alt={'img'}
                width={62}
                height={21}
              />
            ) : (
              <Image
                src={'/home/square.svg'}
                alt={'img'}
                width={62}
                height={21}
              />
            )}
          </div>
          {delayed && (
            <div
              className={styles.sidenavDelayedWrraper}
              style={{ display: removeModalDate ? 'none' : 'block' }}
            >
              <div className='date-wrapper-mb'>
                <h3 style={{
                    color: '#525252',
                    fontSize: "23.54px",
                    fontWeight: "500",
                    lineHeight: "28.24px",
                    textAlign: "left",
                  }}>Дата</h3>
                <div>
                  <div className="Lead">{currentDate}</div>
                  <Image
                    src={'/onboarding/ToggleHorisontal.svg'}
                    alt={'img'}
                    width={40}
                    height={40}
                  />
                </div>
              </div>
              <div className='time-wrapper-line'>
                <h3 style={{ 
                  color: '#525252',
                  fontSize: "23.54px",
                  fontWeight: "500",
                  lineHeight: "28.24px",
                  textAlign: "left",
                  }}>Время</h3>
                <div>
                  <div className="Lead">{futureTime}</div>
                  <Image
                    src={'/onboarding/ToggleHorisontal.svg'}
                    alt={'img'}
                    width={40}
                    height={40}
                  />
                </div>
              </div>
            </div>
          )}
          {addConfirm && vpkSelected && theGorgeSelected && (
            // <div style={{ opacity: delayed && !removeModalDate ? '0' : delayed && removeModalDate ? '1' : '0' }} className={styles.sidenavAddConfirm}>
              <div style={{ opacity: opacityConfirm}} className={styles.sidenavAddConfirm}>
              <Image
                src={'/onboarding/backgroundImgGreen.svg'}
                width={350}
                height={140}
                alt={'backgr'}
                className={styles.sidenavAddConfirmImage}
              />
              <span className="Lead" style={{ color: '#787878' }}>
                Для перехода к запуску <br /> атаки нажмите кнопку
              </span>
              {/* <div style={{transform: 'translate(20px, -15px)'}} onClick={() => {
                  onSetCurrentAction();
                  goOnboardingSummary();
                }}>
                <span
                  className="Lead"
                  style={{ color: 'white', padding: '10px' }}
                >
                  ПОДТВЕРДИТЬ
                </span>
                <Image
                  className='sidenav__add-confitm__Arrow'
                  src={'onboarding/arrowConfirm.svg'}
                  alt={'arrow'}
                  height={23}
                  width={23}
                />
              </div> */}
              <div style={{transform: 'translateY(-7px)', pointerEvents: removeModalDate ? 'all' : 'none'}} onClick={() => {
                  // onSetCurrentAction();
                  goOnboardingSummary();
                }}>
                <span
                  className="Lead"
                  style={{ color: 'white', padding: '10px 10px 10px 0', marginLeft: '30px' }}
                >
                  ПОДТВЕРДИТЬ
                </span>
                <Image
                  className='sidenav__add-confitm__Arrow'
                  src={'onboarding/arrowConfirm.svg'}
                  style={{pointerEvents: removeModalDate ? 'all' : 'none'}}
                  alt={'arrow'}
                  height={23}
                  width={23}
                  onClick={goOnboardingSummary}
                />
              </div>
            </div>
          )}
        </div>
      </Box>
    </>
  );
}
export default Sidenav;
