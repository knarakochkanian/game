'use client';
import React, { useState } from 'react';
import styles from './Sidenav.module.scss';
import Image from 'next/image';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Modal from '../Modals/Modal';
import {
  selectIsAttacking,
  setBlur,
  setComfirmedFromOnboarding,
  setCurrentAction,
  setIsAttacking,
} from '../../redux/features/generalSlice';
import Link from 'next/link';
import zIndex from '@mui/material/styles/zIndex';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ATTACK, ATTACK_OR_PROTECT, CRITICAL } from '../../constants';
import { attack } from '../../public/count-down';
import { protectionIcon } from '../../public/history';
import { news_2 } from '../../data/news';
import launchConsequences from '../../data/launchConsequences';
import industry, { defaultSectorsSelection } from '../../data/industryData';
import USA from '../../data/countriesWithCodes';

import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/system';
interface SidenavProps {
  isOpen?: boolean;
  onClose?: () => void;
  sx?: SxProps<Theme>;
  vpkSelected?: boolean;
  theGorgeSelected?: boolean;
  addConfirm?: boolean;
  delayed?: boolean;
  removeModalDate?: boolean;
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
}: SidenavProps) {
  const dispatch = useAppDispatch();
  const isAttacking = useAppSelector(selectIsAttacking);
  // const handleBtn_1_Click = () => {
  //   if (name === ATTACK_OR_PROTECT) {
  //     dispatch(setIsAttacking(true));
  //   } else {
  //     (setFirstActive as setFirstActive)(true);
  //   }
  // };

  const onSetCurrentAction = () => {
    const currentAction: IAction = {
      actionType: ATTACK,
      news: news_2,
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

  return (
    <>
      <Box
        sx={sx}
        id="mySidenav"
        className={styles.sidenav}
        style={{ width: isOpen ? '328px' : '0' }}
      >
        <div className={styles.sidenavWrapper}>
          <Image
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
                <div className={styles.sidenavAccordionSummary}>
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
                <div className={styles.sidenavAccordionSummary}>
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
                <div className={styles.sidenavAccordionSummary}>
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
            style={{ display: removeModalDate ? 'none' : 'flex', zIndex: 10 }}
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
              <div>
                <h3 style={{ color: '#525252' }}>Дата</h3>
                <div>
                  <div className="Lead">03.02.2024</div>
                  <Image
                    src={'/onboarding/ToggleHorisontal.svg'}
                    alt={'img'}
                    width={40}
                    height={40}
                  />
                </div>
              </div>
              <div>
                <h3 style={{ color: '#525252' }}>Время</h3>
                <div>
                  <div className="Lead">20:13</div>
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
            <div className={styles.sidenavAddConfirm}>
              <Image
                src={'/onboarding/backgroundImgGreen.svg'}
                width={692}
                height={216}
                alt={'backgr'}
                className={styles.sidenavAddConfirmImage}
              />
              <span className="Lead" style={{ color: '#787878' }}>
                Для перехода к запуску <br /> атаки нажмите кнопку
              </span>
              <Link href="/summary" onClick={onSetCurrentAction}>
                <span
                  className="Lead"
                  style={{ color: 'white', padding: '10px' }}
                >
                  ПОДТВЕРДИТЬ
                </span>
                <Image
                  src={'onboarding/arrowConfirm.svg'}
                  alt={'arrow'}
                  height={48}
                  width={48}
                />
              </Link>
            </div>
          )}
        </div>
      </Box>
    </>
  );
}
export default Sidenav;
