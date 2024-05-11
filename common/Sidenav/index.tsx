import React from 'react';
import styles from './Sidenav.module.scss';
import Image from 'next/image';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/system';
interface SidenavProps {
  isOpen: boolean;
  onClose: () => void;
  sx?: SxProps<Theme>;
  vpkSelected?: boolean;
  theGorgeSelected?: boolean;
  addConfirm?: boolean;
}

function Sidenav({
  isOpen,
  onClose,
  sx,
  vpkSelected,
  theGorgeSelected,
  addConfirm,
}: SidenavProps) {
  return (
    <>
      <Box
        sx={sx}
        id="mySidenav"
        className={styles.sidenav}
        style={{ width: isOpen ? '696px' : '0' }}
      >
        <div className={styles.sidenavWrapper}>
          <div className={styles.sidenavTitle}>
            <h2>Атака #000-001</h2>
            <Image src="home/basket.svg" alt="basket" width={48} height={48} />
          </div>

          <div className="AccordionsWrap">
            <Accordion
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
                sx={{ display: 'flex', alignItems: 'center' }}
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
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <div className={styles.sidenavAccordionSummary}>
                  <h3>Ущерб</h3>
                  {theGorgeSelected && (
                    <h3 style={{ color: '#fff !important' }}>Критический </h3>
                  )}
                </div>
              </AccordionSummary>
            </Accordion>
            <div className={styles.sidenavSquare}>
              <h5 style={{ color: '#787878' }}>Отложенный запуск</h5>{' '}
              <Image
                src={'/home/square.svg'}
                alt={'img'}
                width={131}
                height={45}
              />
            </div>
          </div>
          {addConfirm && (
            <div className={styles.sidenavAddConfirm}>
              <span className="Lead" style={{ color: '#787878' }}>
                Для перехода к запуску <br /> атаки нажмите кнопку
              </span>
              <span className="Lead">ПОДТВЕРДИТЬ</span>
            </div>
          )}
        </div>
      </Box>
    </>
  );
}

export default Sidenav;
