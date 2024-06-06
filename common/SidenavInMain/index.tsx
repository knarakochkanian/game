'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/system';
import {
  resetGeneralState,
  selectDamgeLevel,
  selectIsAttacking,
  selectPickedCountriesObjects,
  selectSectors,
  setCurrentAction,
} from '../../redux/features/generalSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ATTACK, A_TTACK, PROTECTION, P_ROTECTION } from '../../constants';
import { attack } from '../../public/count-down';
import { protectionIcon } from '../../public/history';
import {
  countSelectedOptions,
  extractNumber,
  getNextActionName,
} from '../../helpers';
import DamageLevelInfo from '../DamageLevelInfo';
import RegionAccordion from '../../components/RegionAccordion';
import IndustryAccordion from '../../components/IndustryAccordion';
import { news_2 } from '../../data/news';
import launchConsequences from '../../data/launchConsequences';
import { protectBlueTrash, trash } from '../../public/summary';
import TrashModal from '../TrashModal';
import useCloseModal from '../../hooks/useCloseModal';
import { setResetMapIfChanged } from '../../redux/features/helpersSlice';

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
  const dispatch = useAppDispatch();  
  const [trashModalOpen, setTrashModalOpen] = useState(false);
  const closeModal = () => setTrashModalOpen(false);
  useCloseModal(trashModalOpen, setTrashModalOpen);
  let trashCallBack = () => {
    dispatch(setResetMapIfChanged());
    dispatch(resetGeneralState());
    closeModal();
  };

  const selectedCountries = useAppSelector(selectPickedCountriesObjects);
  const damageLevel = useAppSelector(selectDamgeLevel);
  const isAttacking = useAppSelector(selectIsAttacking);
  const industrySectors = useAppSelector(selectSectors);
  const numberOfSelectedSectors =
    countSelectedOptions(industrySectors, 'selected') !== 0
      ? countSelectedOptions(industrySectors, 'selected')
      : null;
  const [lastActionName, setLastActionName] = useState<string | null>();
  const [name, setName] = useState('');

  useEffect(() => {
    const name = lastActionName
      ? getNextActionName(lastActionName)
      : '#000-001';
    setName(name);
  }, [lastActionName]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const lastActionName = window.localStorage.getItem('lastActionName');
      setLastActionName(lastActionName);
    }
  }, []);

  const onSetCurrentAction = () => {
    const currentAction: IAction = {
      actionType: isAttacking ? ATTACK : PROTECTION,
      news: news_2,
      launchConsequences,
      id: extractNumber(name),
      damageLevel,
      date: '03.02.2024 12:30',
      industrySectors,
      isCompleted: null,
      name,
      selectedCountries,
    };

    dispatch(setCurrentAction(currentAction));
  };

  return (
    <>
      <Box
        sx={sx}
        id="mySidenav"
        className={styles.sidenav}
        style={{ width: isOpen ? '696px' : '0' }}
      >
        {trashModalOpen && (
          <TrashModal
            closeModal={closeModal}
            name="trashInSidnav"
            trashCallBack={trashCallBack}
            trashModalOpen={trashModalOpen}
          />
        )}

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
            <h2>
              {isAttacking ? A_TTACK : P_ROTECTION} {name}
            </h2>

            <button onClick={() => setTrashModalOpen(true)}>
              <Image
                src={isAttacking ? trash : protectBlueTrash}
                alt="trash"
                className={styles.trash}
                width={48}
                height={48}
              />
            </button>
          </div>

          <div className="AccordionsWrap">
            <RegionAccordion
              selectedCountries={selectedCountries}
              delayed={delayed}
            />
            <IndustryAccordion
              industrySectors={industrySectors}
              delayed={delayed}
            />
            <DamageLevelInfo damageLevel={damageLevel} />
          </div>

          <div
            className={styles.sidenavSquare}
            style={{ display: removeModalDate ? 'none' : 'flex', zIndex: 10 }}
          >
            <h5
              style={{
                color: delayed ? 'white' : '#787878',
                paddingLeft: '24px',
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
                  src={
                    isAttacking
                      ? '/onboarding/backgroundImgGreen.svg'
                      : '/onboarding/backgroundImgBlue.svg'
                  }
                  width={692}
                  height={216}
                  alt={'backgr'}
                  className={styles.sidenavAddConfirmImage}
                />
                <span
                  className="Lead"
                  style={{ color: '#787878', paddingTop: '10px' }}
                >
                  Для перехода к запуску <br />{' '}
                  {isAttacking ? <span> атаки </span> : <span> защиты </span>}{' '}
                  нажмите кнопку
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
export default SidenavInMain;
