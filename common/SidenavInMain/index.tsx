'use client';

import { useRouter } from 'next/navigation';
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
import Switch from '../Switch/index';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  ATTACK,
  A_TTACK,
  PROTECTION,
  P_ROTECTION,
  ACTIONS_IN_QUEUE,
  LAST_ACTION_NAME,
} from '../../constants';
import { attack } from '../../public/count-down';
import { protectionIcon } from '../../public/history';
import {
  countSelectedOptions,
  extractNumber,
  formatDate,
  getNextActionName,
} from '../../helpers';
import DamageLevelInfo from '../DamageLevelInfo';
import RegionAccordion from '../../components/RegionAccordion';
import IndustryAccordion from '../../components/IndustryAccordion';
import launchConsequences from '../../data/launchConsequences';
import { protectBlueTrash, trash } from '../../public/summary';
import styles from './SidenavInMain.module.scss';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { type DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
import { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MultiSectionDigitalClock } from '@mui/x-date-pickers';
import useCloseModal from '../../hooks/useCloseModal';
import {
  setCloseSelectionIfChanged,
  setResetMapIfChanged,
} from '../../redux/features/helpersSlice';
import TrashModal from '../TrashModal';
import { getDelayedDateWithTime } from '../../helpers/helpers_1';
import { useWebSocket } from '../../contexts/WebSocketContext';
import ModalContainer from '../Modals/ModalContainer';
import SystemState from '../SystemState';

interface ISidenavInMainProps {
  isOpen?: boolean;
  onClose?: () => void;
  sx?: SxProps<Theme>;
  vpkSelected?: boolean;
  theGorgeSelected?: boolean;
  addConfirm?: boolean;
  removeModalDate?: boolean;
}

function SidenavInMain({
  isOpen,
  onClose,
  sx,
  removeModalDate,
}: ISidenavInMainProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [trashModalOpen, setTrashModalOpen] = useState(false);
  const closeModal = () => setTrashModalOpen(false);
  useCloseModal(trashModalOpen, setTrashModalOpen);
  const { socket, pingFailed } = useWebSocket()!;
  const [modalVisibleSystem, setModalVisibleSystem] = useState(false);
  const [lastActionName, setLastActionName] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [delayed, setDelayed] = useState(false);
  const [time, setTime] = useState(false);
  const [day, setDay] = useState(false);
  const [delayedDate, setDelayedDate] = useState<Dayjs | null>(null);
  const [delayedTime, setDelayedTime] = useState<string | null>(null);
  const [startDate, setStartDate] = useState(new Date());
  const confirmButtonRef = useRef<HTMLDivElement>(null); // Update ref type to HTMLDivElement
  const selectedCountries = useAppSelector(selectPickedCountriesObjects);
  const damageLevel = useAppSelector(selectDamgeLevel);
  const isAttacking = useAppSelector(selectIsAttacking);
  const industrySectors = useAppSelector(selectSectors);
  const numberOfSelectedSectors =
    countSelectedOptions(industrySectors, 'selected') !== 0
      ? countSelectedOptions(industrySectors, 'selected')
      : null;
  const [isReadyPressed, setIsReadyPressed] = useState(false);

  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsSwitchOn(checked);
    setDelayed(checked);
  };

  const handelOnDatePikerOpen = () => {
    setDay(true);
  };

  const handleTimeChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setDelayedTime(newValue.format('HH:mm'));
    }
  };

  useEffect(() => {
    const actionName = lastActionName
      ? getNextActionName(lastActionName)
      : '#000-001';
    setName(actionName);
  }, [lastActionName]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const actionName = window.localStorage.getItem('lastActionName');
      setLastActionName(actionName);
    }
  }, []);

  const onSetCurrentAction = () => {
    const delayedDateWithTime = getDelayedDateWithTime(
      delayedDate,
      delayedTime
    );

    const currentAction = {
      actionType: isAttacking ? ATTACK : PROTECTION,
      news: [],
      launchConsequences,
      id: extractNumber(name),
      damageLevel,
      date:
        delayedDate && delayedTime
          ? delayedDate.format('DD.MM.YYYY HH:mm')
          : '03.02.2024 12:30',
      industrySectors,
      isCompleted: delayedDate && delayedTime ? false : null,
      name,
      selectedCountries,
    };

    if (delayedDate && delayedTime) {
      const actionsInQueue = JSON.parse(
        window.localStorage.getItem(ACTIONS_IN_QUEUE) || '[]'
      );
      actionsInQueue.push(currentAction);
      window.localStorage.setItem(
        ACTIONS_IN_QUEUE,
        JSON.stringify(actionsInQueue)
      );
      window.localStorage.setItem(LAST_ACTION_NAME, name);
    }
    dispatch(setCurrentAction(currentAction));

    router.push(delayedTime && delayedDate ? '/queue' : '/summary');
  };

  useEffect(() => {
    if (!socket) return;
    const handleSocketClick = (event: MessageEvent) => {
      if (event.data === 'ready pressed') {
        setIsReadyPressed(true);
      }
      if (event.data === 'accept pressed' && confirmButtonRef.current) {
        confirmButtonRef.current.click();
      }
    };
    socket.addEventListener('message', handleSocketClick);
    return () => {
      socket.removeEventListener('message', handleSocketClick);
    };
  }, [socket]);

  useEffect(() => {
    if (
      numberOfSelectedSectors !== null &&
      damageLevel &&
      selectedCountries.length !== 0 &&
      !pingFailed &&
      socket?.readyState === WebSocket.OPEN
    ) {
      socket.send('ready');
    } else if (socket?.readyState !== WebSocket.OPEN) {
      socket?.addEventListener('open', () => {
        if (
          numberOfSelectedSectors !== null &&
          damageLevel &&
          selectedCountries.length !== 0 &&
          !pingFailed
        ) {
          socket.send('ready');
        }
      });
    }
  }, [
    numberOfSelectedSectors,
    damageLevel,
    selectedCountries,
    pingFailed,
    socket,
  ]);

  useEffect(() => {
    setModalVisibleSystem(pingFailed);
  }, [pingFailed]);

  return (
    <>
      <Box
        sx={sx}
        id="mySidenav"
        className={styles.sidenav}
        style={{ width: isOpen ? '328px' : '0' }}
      >
        {trashModalOpen && (
          <TrashModal
            closeModal={closeModal}
            name="trashInSidnav"
            trashCallBack={() => {
              dispatch(setResetMapIfChanged());
              dispatch(resetGeneralState());
              dispatch(setCloseSelectionIfChanged());
              closeModal();
            }}
            trashModalOpen={trashModalOpen}
          />
        )}
        <div className={styles.sidenavWrapper}>
          <Image
            src={isAttacking ? attack : protectionIcon}
            alt="actionSign"
            className={styles.actionSign}
            width={40}
            height={40}
          />
          <div className={styles.sidenavTitle}>
            <h2>
              {isAttacking ? A_TTACK : P_ROTECTION} {name}
            </h2>

            <button onClick={() => setTrashModalOpen(true)}>
              <Image
                src={isAttacking ? trash : protectBlueTrash}
                alt="trash"
                className={styles.trash}
                width={23}
                height={23}
              />
            </button>
          </div>

          <div
            className={`${'AccordionsWrap'} ${styles.sidenavAccordionsWrap}`}
          >
            <RegionAccordion
              selectedCountries={selectedCountries}
              setWithOutFlag={true}
            />
            <IndustryAccordion
              industrySectors={industrySectors}
              fromSideNav={true}
            />
            <DamageLevelInfo fromSideNav damageLevel={damageLevel} />
          </div>

          {/*<div*/}
          {/*  className={styles.sidenavSquare}*/}
          {/*  style={{ display: removeModalDate ? 'none' : 'flex', zIndex: 10 }}*/}
          {/*>*/}
          {/*  <h5 style={{ paddingLeft: '24px' }}>Отложенный запуск</h5>*/}
          {/*  <Switch isOn={isSwitchOn} handleSwitchChange={handleSwitchChange} />*/}
          {/*</div>*/}
          {/*<div*/}
          {/*  className={styles.sidenavDelayedWrraper}*/}
          {/*  style={{ display: delayed ? 'block' : 'none' }}*/}
          {/*>*/}
          {/*  <div>*/}
          {/*    <LocalizationProvider dateAdapter={AdapterDayjs} locale="ru">*/}
          {/*      <button>*/}
          {/*        <h3 style={{ color: '#525252' }}>Дата</h3>*/}
          {/*      </button>*/}
          {/*      <div className={styles.sidenavDelayedDateWrraper}>*/}
          {/*        <DatePicker*/}
          {/*          selected={startDate}*/}
          {/*          onChange={(date) => setStartDate(date as Date)}*/}
          {/*          peekNextMonth*/}
          {/*          showMonthDropdown*/}
          {/*          showYearDropdown={false}*/}
          {/*          dropdownMode="select"*/}
          {/*          className={styles.sidenavDelayedDate}*/}
          {/*          locale="ru"*/}
          {/*        />*/}
          {/*        {delayedDate?.format('DD.MM.YYYY')}*/}
          {/*        <Image*/}
          {/*          src={'/onboarding/ToggleHorisontal.svg'}*/}
          {/*          alt="img"*/}
          {/*          width={24}*/}
          {/*          height={24}*/}
          {/*        />*/}
          {/*      </div>*/}
          {/*    </LocalizationProvider>*/}
          {/*  </div>*/}
          {/*  <div>*/}
          {/*    <button onClick={() => setTime(true)}>*/}
          {/*      <h3 style={{ color: '#525252' }}>Время</h3>*/}
          {/*    </button>*/}
          {/*    <div>*/}
          {/*      <div className={styles.sidenavTimePiker}>*/}
          {/*        <LocalizationProvider dateAdapter={AdapterDayjs} locale="ru">*/}
          {/*          <DemoContainer components={['TimePicker']}>*/}
          {/*            <DemoItem label="Multi section digital clock">*/}
          {/*              <MultiSectionDigitalClock onChange={handleTimeChange} />*/}
          {/*            </DemoItem>*/}
          {/*          </DemoContainer>*/}
          {/*          <button onClick={() => setTime(false)}>OK</button>*/}
          {/*        </LocalizationProvider>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*    <div className="Lead">*/}
          {/*      {delayedTime}{' '}*/}
          {/*      <Image*/}
          {/*        src={'/onboarding/ToggleHorisontal.svg'}*/}
          {/*        alt={'img'}*/}
          {/*        width={24}*/}
          {/*        height={24}*/}
          {/*      />{' '}*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
          {numberOfSelectedSectors !== null &&
            damageLevel &&
            selectedCountries.length !== 0 &&
            // !pingFailed &&
             (
              <div className={styles.sidenavAddConfirm}>
                <Image
                  src={
                    isAttacking
                      ? '/onboarding/backgroundImgGreen.svg'
                      : '/onboarding/backgroundImgBlue.svg'
                  }
                  width={328}
                  height={102}
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
                <div>
                  <span
                    className="Lead"
                    style={{ color: 'white', padding: '10px' }}
                  >
                    ПОДТВЕРДИТЬ
                  </span>
                  <Image
                    src={'/onboarding/arrowConfirm.svg'}
                    alt={'arrow'}
                    className={styles.sidenavArrowSVG}
                    height={23}
                    width={23}
                  />
                </div>
              </div>
            )}
          {modalVisibleSystem && (
            <Box sx={{ bottom: '200px', position: 'absolute' }}>
              <ModalContainer
                setModalClose={() => setModalVisibleSystem(false)}
              >
                <SystemState isOn={pingFailed} />
              </ModalContainer>
            </Box>
          )}
        </div>
      </Box>
    </>
  );
}

export default SidenavInMain;
