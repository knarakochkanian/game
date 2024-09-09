'use client';
import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/system';
import { PickersLayout } from '@mui/x-date-pickers/PickersLayout';
import {
  resetGeneralState,
  selectDamgeLevel,
  selectFormattedFinancialLosses,
  selectIsAttacking,
  selectPickedCountries,
  selectPickedCountriesObjects,
  selectSectors,
  selectTotalPopulationRegions,
  selectTotalPopulationRegionsAffected,
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
  monthNames,
} from '../../constants';
import { attack } from '../../public/count-down';
import { protectionIcon } from '../../public/history';
import {
  countSelectedOptions,
  extractNumber,
  formatDate,
  getItemFromStorage,
  getNextActionName,
} from '../../helpers';

import DamageLevelInfo from '../DamageLevelInfo';
import RegionAccordion from '../../components/RegionAccordion';
import IndustryAccordion from '../../components/IndustryAccordion';
import { protectBlueTrash, trash } from '../../public/summary';
import styles from './SidenavInMain.module.scss';

import {
  ChangeEvent,
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { type DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
import 'dayjs/locale/ru';

import 'react-datepicker/dist/react-datepicker.css';
import { MultiSectionDigitalClock, TimeStepOptions } from '@mui/x-date-pickers';
import useCloseModal from '../../hooks/useCloseModal';
import {
  setCloseSelectionIfChanged,
  setResetMapIfChanged,
} from '../../redux/features/helpersSlice';
import TrashModal from '../TrashModal';
import { IconButton } from '@mui/material';
import ruLocale from 'dayjs/locale/ru';
import { getDelayedDateWithTime } from '../../helpers/helpers_1';
import {
  DeviceEventId,
  useDeviceConnection,
} from '../../contexts/WebSocketContext';
import ModalContainer from '../Modals/ModalContainer';
import SystemState from '../SystemState';
import { ILaunchConsequences } from '../../data/launchConsequences';
import { formatNumberWithSpaces } from '../../helpers/formatedNumber';
import dayjs, { Dayjs } from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import LightModeIcon from '@mui/icons-material/LightMode';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { closeXButton } from '../../public/ui_kit';
import { useNTP } from '../../contexts/NTPDateContext';

dayjs.extend(updateLocale);

dayjs.updateLocale('ru', {
  weekStart: 0,
});
dayjs.locale('ru');
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
  const [trashModalOpen, setTrashModalOpen] = useState(false);
  const closeModal = () => setTrashModalOpen(false);
  useCloseModal(trashModalOpen, setTrashModalOpen);
  const { lastDeviceEvent, pingFailed, send } = useDeviceConnection()!;
  const [modalVisibleSystem, setModalVisibleSystem] = useState(false);
  const [lastActionName, setLastActionName] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [delayed, setDelayed] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const { getDate } = useNTP();
  const getDefaultDelayedTime = () => {
    const date = getDate();
    if (date) {
      const currentDate = formatDate(date);
      const timePart = currentDate.slice(-5);
      return timePart;
    }
    return null;
  };
  const [delayedTime, setDelayedTime] = useState<string | null>(
    getDefaultDelayedTime
  );
  const [indelayedDate, setDelayedDate] = useState<string | null>(null);
  const [readyIsSend, setReadyIsSend] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const confirmButtonRef = useRef<HTMLAnchorElement>(null);
  const selectedCountries = useAppSelector(selectPickedCountriesObjects);
  const damageLevel = useAppSelector(selectDamgeLevel);
  const isAttacking = useAppSelector(selectIsAttacking);
  const industrySectors = useAppSelector(selectSectors);
  const totalPopulationRegions = useAppSelector(
    selectTotalPopulationRegionsAffected
  ); //populationSuffering
  const totalSettlements = useAppSelector(selectPickedCountriesObjects); ///citiesUnderAttack
  const formattedFinancialLosses = useAppSelector(
    selectFormattedFinancialLosses
  ); //wholeDamage
  const pickedCountries = useAppSelector(selectPickedCountries);

  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
  const numberOfSelectedSectors =
    countSelectedOptions(industrySectors, 'selected') !== 0
      ? countSelectedOptions(industrySectors, 'selected')
      : null;

  const isStateReady = useMemo(() => {
    return (
      numberOfSelectedSectors !== null &&
      damageLevel &&
      selectedCountries.length !== 0
    );
  }, [numberOfSelectedSectors, damageLevel, selectedCountries]);

  const [tempSelectedDate, setTempSelectedDate] = useState<Dayjs | null>(
    dayjs()
  );

  const handleDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      const updatedDate = newDate.locale('ru');
      setTempSelectedDate(updatedDate);

      const isToday = updatedDate.isSame(dayjs(), 'day');
      if (isToday) {
        const defaultTime = getDefaultDelayedTime();
        setDelayedTime(defaultTime);
      }
    }
  };
  const shouldDisableTime = (
    value: Dayjs,
    view: 'hours' | 'minutes' | 'seconds'
  ) => {
    if (!tempSelectedDate) {
      return false;
    }

    const isToday = tempSelectedDate.isSame(dayjs(), 'day');
    if (isToday) {
      const currentTime = dayjs();
      if (view === 'hours' && value.hour() < currentTime.hour()) {
        return true;
      }
      if (
        view === 'minutes' &&
        value.hour() === currentTime.hour() &&
        value.minute() < currentTime.minute()
      ) {
        return true;
      }
      if (
        view === 'seconds' &&
        value.hour() === currentTime.hour() &&
        value.minute() === currentTime.minute() &&
        value.second() < currentTime.second()
      ) {
        return true;
      }
    }
    return false;
  };

  const handleOkButtonClick = () => {
    if (tempSelectedDate) {
      const formattedDate = tempSelectedDate.format('YYYY-MM-DD');
      setDelayedDate(formattedDate);
      console.log('Delayed date set to:', formattedDate);
      setCalendarOpen(false);
    } else {
      console.log('No date selected');
    }
  };

  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsSwitchOn(checked);
    setDelayed(checked);
  };
  const closeCalendarAndTimePicker = () => {
    setCalendarOpen(false);
  };

  const handleTimeChangeInternal = (newValue: Dayjs | null) => {
    if (newValue) {
      setSelectedTime(newValue);
      setDelayedTime(newValue.format('HH:mm'));
      closeCalendarAndTimePicker();
    }
  };

  const handleDateButtonClick = () => {
    setCalendarOpen(!calendarOpen);
    if (isTimePickerOpen) {
      closeCalendarAndTimePicker();
    }
  };
  const handleTimeButtonClick = () => {
    setCalendarOpen(false);
    setIsTimePickerOpen(true);
  };
  const handleOpenDateCalendar = () => {
    setCalendarOpen(true);
    setIsTimePickerOpen(false);
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
  useEffect(() => {
    if (delayedTime) {
      const parts = delayedTime.split(' ');

      if (parts.length >= 4) {
        const formattedDate = `${parts[3]}-${monthNames[parts[1]]}-${parts[2]}`;
        setDelayedDate(formattedDate);
      } else {
        console.error('Unexpected date format');
      }
    }
  }, [delayedTime]);

  const onSetCurrentAction = () => {
    const selectedOptionsN = industrySectors
      ?.flatMap((sector) => sector.options)
      .filter((option) => option.selected)
      .reduce((sum, option) => sum + (option.n ?? 0), 0);

    const damageLevelCount = () => {
      switch (damageLevel) {
        case 'Критический':
          return 0.4;
        case 'Минимальный':
          return 0.23;
        case 'Предупреждение':
          return 0.08;
        default:
          return 0;
      }
    };

    const totalSettlementsCount = totalSettlements.reduce(
      (total, item) => total + (item.settlements || 0),
      0
    );

    let calculatedCitiesUnderAttack = Math.ceil(
      totalSettlementsCount * (selectedOptionsN / 399.5) * damageLevelCount()
    );

    const citiesUnderAttack =
      calculatedCitiesUnderAttack > totalSettlementsCount
        ? formatNumberWithSpaces(totalSettlementsCount)
        : formatNumberWithSpaces(calculatedCitiesUnderAttack);
    const launchConsequences: ILaunchConsequences = {
      citiesUnderAttack,
      populationSuffering: formatNumberWithSpaces(totalPopulationRegions),
      wholeDamage: formattedFinancialLosses,
    };

    const isCompleted =
      (tempSelectedDate || delayedTime) && isSwitchOn ? false : null;

    const currentAction = {
      actionType: isAttacking ? ATTACK : PROTECTION,
      news: [],
      pickedCountries,
      launchConsequences,
      id: extractNumber(name),
      damageLevel,
      date:
        tempSelectedDate || delayedTime || isSwitchOn
          ? `${dayjs(tempSelectedDate).format('DD.MM.YYYY')} ${
              delayedTime || ''
            }`
          : '03.02.2024 11:11',
      industrySectors,
      isCompleted,
      name,
      selectedCountries,
    };

    dispatch(setCurrentAction(currentAction));
  };

  useEffect(() => {
    if (
      lastDeviceEvent &&
      lastDeviceEvent.eventId === DeviceEventId.AcceptPressed &&
      !lastDeviceEvent.consumed &&
      confirmButtonRef.current
    ) {
      lastDeviceEvent.consumed = true;
      confirmButtonRef.current.click();
    }
  }, [lastDeviceEvent]);

  useEffect(() => {
    if (isStateReady && !pingFailed) {
      setReadyIsSend(true);
      send('ready');
    } else if (!isStateReady && !pingFailed && readyIsSend) {
      setReadyIsSend(false);
      send('cancel');
      send('ping');
    }
  }, [pingFailed, send, isStateReady, readyIsSend, setReadyIsSend]);

  useEffect(() => {
    setModalVisibleSystem(pingFailed);
  }, [pingFailed]);

  const connectionСonditions: string | boolean =
    numberOfSelectedSectors !== null &&
    damageLevel &&
    selectedCountries.length !== 0 &&
    !pingFailed;

  const timeStep: TimeStepOptions = {
    hours: 1,
    minutes: 1,
    seconds: 1,
  };

  const handleDelete = () => {
    dispatch(setResetMapIfChanged());
    dispatch(resetGeneralState());
    dispatch(setCloseSelectionIfChanged());
    closeModal();
    setDelayed(false);
    setIsSwitchOn(false);
    setDelayedTime(getDefaultDelayedTime());
    setTempSelectedDate(dayjs());
  };

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
            trashCallBack={handleDelete}
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

          <div className={`AccordionsWrap ${styles.sidenavAccordionsWrap}`}>
            <RegionAccordion
              fromSideNav
              selectedCountries={selectedCountries}
              setWithOutFlag={true}
            />
            <IndustryAccordion
              industrySectors={industrySectors}
              fromSideNav={true}
            />
            <DamageLevelInfo fromSideNav damageLevel={damageLevel} />
          </div>

          <div
            className={styles.sidenavSquare}
            style={{ display: removeModalDate ? 'none' : 'flex', zIndex: 10 }}
          >
            <h5
              style={{
                paddingLeft: '24px',
                color: connectionСonditions ? 'white' : '#787878',
              }}
            >
              Отложенный запуск
            </h5>
            <Switch isOn={isSwitchOn} handleSwitchChange={handleSwitchChange} />
          </div>
          <div
            className={styles.sidenavDelayedWrraper}
            style={{ display: delayed ? 'block' : 'none' }}
          >
            <div>
              <button
                className={
                  isAttacking
                    ? styles.sidenavDelayedDateButton
                    : styles.sidenavDelayedDateButtonBlue
                }
              >
                <span></span>
                <h3>Дата</h3>
              </button>
              <div className={styles.sidenavDelayedDateWrraper}>
                {calendarOpen && (
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    locale={'ru'}
                  >
                    <Box
                      sx={{
                        backgroundColor: 'black',
                        color: 'white',
                        position: 'absolute',
                        left: '-350px',
                        bottom: '240px',
                        '& .MuiPickersDay-root': {
                          color: 'white',
                          '&.Mui-disabled:not(.Mui-selected)': {
                            color: '#525252 !important',
                          },
                        },
                        '& .MuiPickersDay-today': {
                          border: `1px solid ${isAttacking ? '#5ED1C5' : '#6291ff'} !important`,
                          color: `${isAttacking ? '#5ED1C5' : '#6291ff'}`,
                          borderRadius: '0',
                        },
                        '& .MuiDateCalendar-root': {
                          maxHeight: '310px',
                        },
                        '& .Mui-selected': {
                          borderRadius: '0',
                          color: 'white',
                          backgroundColor: `${isAttacking ? '#5ED1C5' : '#6291ff'} !important `,
                        },
                        '& .MuiDayCalendar-weekDayLabel': {
                          color: 'white !important',
                        },
                        '& .MuiSvgIcon-root': {
                          color: `${isAttacking ? '#5ED1C5' : '#6291ff'} !important`,
                        },
                        '& .MuiPickersCalendarHeader-label': {
                          textTransform: 'uppercase',
                        },
                        '& .MuiPickersCalendarHeader-root': {
                          maxWidth: '290px',
                        },
                        '& .MuiPickersMonth-root .Mui-disabled': {
                          color: '#525252 !important',
                        },
                        '& .MuiPickersYear-yearButton.Mui-disabled': {
                          color: '#525252 !important',
                        },
                      }}
                    >
                      <Box sx={{ right: '8px', position: 'absolute' }}>
                        <IconButton onClick={() => setCalendarOpen(false)}>
                          <Image
                            src={closeXButton}
                            alt="Close button"
                            width={20}
                            height={20}
                          />
                        </IconButton>
                      </Box>
                      <DateCalendar
                        views={['year', 'month', 'day']}
                        disablePast={true}
                        value={tempSelectedDate}
                        onChange={(newValue) => {
                          handleDateChange(newValue);
                        }}
                      />
                      <button
                        onClick={handleOkButtonClick}
                        className={styles.sidenavDatePikerButton}
                      >
                        <span>OK</span>
                      </button>
                    </Box>
                  </LocalizationProvider>
                )}
              </div>
            </div>
            <button
              className={styles.sidenavDelayedDateCurrentDay}
              onClick={handleDateButtonClick}
            >
              {dayjs(tempSelectedDate).format('DD.MM.YYYY')}
              <Image
                src={'/onboarding/ToggleHorisontal.svg'}
                alt="img"
                width={24}
                height={24}
              />
            </button>
            <div>
              <div
                className={
                  isAttacking
                    ? styles.sidenavDelayedDateButton
                    : styles.sidenavDelayedDateButtonBlue
                }
              >
                <span></span>
                <h3>Время</h3>
              </div>
              {isTimePickerOpen && (
                <div>
                  <div className={styles.sidenavTimePiker}>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      locale="ru"
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                        }}
                      >
                        <span style={{ fontSize: '26px', padding: '10px' }}>
                          Выберите время
                        </span>
                        <IconButton
                          onClick={() => setIsTimePickerOpen(false)}
                          sx={{ marginLeft: '10px' }}
                        >
                          <Image
                            src={closeXButton}
                            alt="Close button"
                            width={20}
                            height={20}
                          />
                        </IconButton>
                      </Box>
                      <Box>
                        <MultiSectionDigitalClock
                          ampm={false}
                          timeSteps={timeStep}
                          onChange={(newTime) =>
                            handleTimeChangeInternal(newTime)
                          }
                          shouldDisableTime={shouldDisableTime}
                          value={dayjs(delayedTime, 'HH:mm')}
                          sx={{
                            '& .MuiList-root': {
                              width: '150px',
                              maxHeight: '175px',
                              scrollbarWidth: 'none',
                            },
                            '& .Mui-selected': {
                              color: `${isAttacking ? '#5ED1C5' : '#6291ff'} !important`,
                              fontSize: '32px',
                              textAlign: 'center',
                              backgroundColor: 'transparent !important',
                            },
                            '& .Mui-selected:hover, .MuiMultiSectionDigitalClockSection-item:hover, .MuiMenuItem-root:hover':
                              {
                                color: `${isAttacking ? '#5ED1C5' : '#6291ff'}`,
                                backgroundColor: 'transparent !important',
                              },
                            '& .MuiButtonBase-root': {
                              fontSize: '26px',
                              margin: 'auto',
                              zIndex: '2',
                            },
                          }}
                        />
                        <div className={styles.sidenavTimePikerNumbersLine}>
                          <span></span>
                        </div>
                        <Image
                          src={`${isAttacking ? 'home/colonGreen.svg' : 'home/colonBlue.svg'}`}
                          alt="colon"
                          width={36}
                          height={23}
                          className={styles.sidenavTimePikerNumbersColon}
                        />
                      </Box>
                      <button
                        onClick={() => setIsTimePickerOpen(false)}
                        className={styles.sidenavTimePikerButton}
                      >
                        <span>OK</span>
                      </button>
                    </LocalizationProvider>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={handleTimeButtonClick}
              className={styles.sidenavDelayedDateCurrentDay}
            >
              <span>{delayedTime}</span>
              <Image
                src={'/onboarding/ToggleHorisontal.svg'}
                alt={'img'}
                width={24}
                height={24}
              />
            </button>
          </div>
          {connectionСonditions && (
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
              <Link
                href={'/summary'}
                onClick={onSetCurrentAction}
                ref={confirmButtonRef}
                style={{ pointerEvents: 'none' }}
              >
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
              </Link>
            </div>
          )}
          {modalVisibleSystem && (
            <Box sx={{ bottom: '200px', position: 'absolute' }}>
              <ModalContainer
                setModalClose={() => setModalVisibleSystem(false)}
              >
                <SystemState isOn={!pingFailed} />
              </ModalContainer>
            </Box>
          )}
        </div>
      </Box>
    </>
  );
}

export default SidenavInMain;
