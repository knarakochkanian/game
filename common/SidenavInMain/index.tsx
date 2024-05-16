'use client';

import Link from 'next/link';
import Image from 'next/image';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/system';
import {
  selectDamgeLevel,
  selectIsAttacking,
  selectPickedCountriesObjects,
  selectSectors,
} from '../../redux/features/generalSlice';
import { useAppSelector } from '../../redux/hooks';
import { A_TTACK, P_ROTECTION } from '../../constants';
import { attack } from '../../public/count-down';
import { protectionIcon } from '../../public/history';
import { countSelectedOptions } from '../../helpers';
import DamageLevelInfo from '../DamageLevelInfo';
import RegionAccordion from '../../components/RegionAccordion';
import IndustryAccordion from '../../components/IndustryAccordion';

import styles from './SidenavInMain.module.scss';

interface ISidenavInMainProps {
  isOpen?: boolean;
  onClose?: () => void;
  sx?: SxProps<Theme>;
  vpkSelected?: boolean;
  theGorgeSelected?: boolean;
  addConfirm?: boolean;
  delayed?: boolean;
  removeModalDate?: boolean;
}

function SidenavInMain({
  isOpen,
  onClose,
  sx,
  delayed,
  removeModalDate,
}: ISidenavInMainProps) {
  const selectedCountries = useAppSelector(selectPickedCountriesObjects);
  const damageLevel = useAppSelector(selectDamgeLevel);
  const isAttacking = useAppSelector(selectIsAttacking);
  const industrySectors = useAppSelector(selectSectors);
  const numberOfSelectedSectors =
    countSelectedOptions(industrySectors, 'selected') !== 0
      ? countSelectedOptions(industrySectors, 'selected')
      : null;

  return (
    <>
      <Box
        sx={sx}
        id="mySidenav"
        className={styles.sidenav}
        style={{ width: isOpen ? '696px' : '0' }}
      >
        <div className={styles.sidenavWrapper}>
          <div
            style={{
              display: delayed ? 'none' : 'flex',
            }}
            className={styles.sidenavTitle}
          >
            <h2>{isAttacking ? A_TTACK : P_ROTECTION} #000-001</h2>

            <Image
              src={isAttacking ? attack : protectionIcon}
              alt="actionSign"
              className={styles.actionSign}
              width={80}
              height={80}
            />
          </div>

          <div className="AccordionsWrap">
            <RegionAccordion delayed={delayed} />
            <IndustryAccordion delayed={delayed} />
            <DamageLevelInfo />
          </div>

          <div
            className={styles.sidenavSquare}
            style={{ display: removeModalDate ? 'none' : 'flex', zIndex: 10 }}
          >
            <h5
              style={{
                color: delayed ? 'white' : '#787878',
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
          {numberOfSelectedSectors !== null &&
            damageLevel &&
            selectedCountries.length !== 0 && (
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
export default SidenavInMain;
