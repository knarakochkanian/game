'use client';
import React, { useState } from 'react';
import styles from './Sidenav.module.scss';
import Image from 'next/image';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/system';
import Modal from '../Modals/Modal';
import {
  selectIsAttacking,
  setBlur,
  setIsAttacking,
} from '../../redux/features/generalSlice';
import Link from 'next/link';
import zIndex from '@mui/material/styles/zIndex';
import { useAppSelector } from '../../redux/hooks';
import { ATTACK_OR_PROTECT } from '../../constants';
import { attack } from '../../public/count-down';
import { protectionIcon } from '../../public/history';

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
  const isAttacking = useAppSelector(selectIsAttacking);
  // const handleBtn_1_Click = () => {
  //   if (name === ATTACK_OR_PROTECT) {
  //     dispatch(setIsAttacking(true));
  //   } else {
  //     (setFirstActive as setFirstActive)(true);
  //   }
  // };

  return (
    <>
      <Box
        sx={sx}
        id="mySidenav"
        className={styles.sidenav}
        style={{ width: isOpen ? '696px' : '0' }}
      >
        <div className={styles.sidenavWrapper}>
          <Image
            src={isAttacking ? attack : protectionIcon}
            alt="actionSign"
            className={styles.actionSign}
            width={80}
            height={80}
          />
          <div
            style={{
              display: delayed ? 'none' : 'flex',
            }}
            className={styles.sidenavTitle}
          >
            {isAttacking ? (
              <>
                <h2>Атака #000-001</h2>
                <Image
                  src="home/basket.svg"
                  alt="basket"
                  width={48}
                  height={48}
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
                    width={24}
                    height={24}
                  />
                }
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{
                  display: delayed ? 'none' : 'flex',
                  alignItems: 'center',
                }}
              >
                <div className={styles.sidenavAccordionSummary}>
                  <h3>Регион</h3>
                  <span>1</span>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <h4>США</h4>
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
                    width={24}
                    height={24}
                  />
                }
                sx={{
                  display: delayed ? 'none' : 'flex',
                }}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <div className={styles.sidenavAccordionSummary}>
                  <h3>Отрасль</h3>
                  <span>1</span>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                {' '}
                {vpkSelected && <h4>ВПК</h4>}
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
                    width={24}
                    height={24}
                  />
                }
                sx={{
                  display: delayed ? 'none' : 'flex',
                }}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <div className={styles.sidenavAccordionSummary}>
                  <h3>Ущерб</h3>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                {theGorgeSelected && <h3>Критический </h3>}
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
                paddingLeft: '21px',
              }}
            >
              Отложенный запуск
            </h5>
            {delayed ? (
              <Image
                src={'/onboarding/Toggle.svg'}
                alt={'img'}
                width={131}
                height={45}
              />
            ) : (
              <Image
                src={'/home/square.svg'}
                alt={'img'}
                width={131}
                height={45}
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
              <Link href="/summary">
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
