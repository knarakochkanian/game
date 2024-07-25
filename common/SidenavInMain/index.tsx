'use client';
import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/system';
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
import { protectBlueTrash, trash } from '../../public/summary';
import styles from './SidenavInMain.module.scss';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { type DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
import 'dayjs/locale/ru';
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MultiSectionDigitalClock } from '@mui/x-date-pickers';
import useCloseModal from '../../hooks/useCloseModal';
import {
  setCloseSelectionIfChanged,
  setResetMapIfChanged,
} from '../../redux/features/helpersSlice';
import TrashModal from '../TrashModal';
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
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import LightModeIcon from '@mui/icons-material/LightMode';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import {Button} from "@mui/base";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

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
  const [time, setTime] = useState(false);
  const [day, setDay] = useState(false);
  const [delayedDate, setDelayedDate] = useState<Dayjs | null>(null);
  const [delayedTime, setDelayedTime] = useState<string | null>(null);
  const [startDate, setStartDate] = useState(new Date());
  const [readyIsSend, setReadyIsSend] = useState(false);
  const [value, setValue] = React.useState<dayjs | null>(dayjs('2022-04-17'));
  const confirmButtonRef = useRef<HTMLAnchorElement>(null); // Update ref type to HTMLDivElement
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

  const [lastAcceptTime, setLastAcceptTime] = useState(0);

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

    const currentAction = {
      actionType: isAttacking ? ATTACK : PROTECTION,
      news: [],
      pickedCountries,
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
    selectedCountries.length !== 0;
  // &&
  // !pingFailed;



const [open, setOpen] = React.useState(false);
const handleClickOpen = () => {
  setOpen(true);
};

const handleDialogClose = () => {
  setOpen(false);
};

const handleDialogOk = () => {
  // Handle OK button click logic
  setOpen(false);
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
              <button className={styles.sidenavDelayedDateButton}>
                <span></span>
                <h3>Дата</h3>
              </button>
              <div className={styles.sidenavDelayedDateWrraper}>
                <LocalizationProvider dateAdapter={AdapterDayjs} locale="ru">
                  <Button variant="outlined" onClick={handleClickOpen}>
                    Open Date Time Picker
                  </Button>
                  <Dialog open={open} onClose={handleDialogClose}>
                    <DialogTitle>Select Date and Time</DialogTitle>
                    <DialogContent>
                      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                        <DemoContainer components={['MultiSectionDigitalClock']}>
                          <MultiSectionDigitalClock
                              ampm={false}
                              value={value}
                              onChange={handleTimeChange}
                          />
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </DialogContent>
                    <DialogActions className="MuiDialogActions-root MuiDialogActions-spacing MuiPickersLayout-actionBar">
                      <Button onClick={handleDialogClose}>Close</Button>
                      <Button onClick={handleDialogOk}>OK</Button>
                    </DialogActions>
                  </Dialog>
                  <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                    <div className={styles.sidenavDelayedDateCurrentDay}>
                      {dayjs().format('DD.MM.YYYY')}
                    </div>
                    <DemoItem>
                      <DateCalendar
                        value={value}
                        slotProps={{
                          tabs: {
                            hidden: false,
                            dateIcon: <LightModeIcon />,
                            timeIcon: <AcUnitIcon />,
                          },
                        }}
                        className={styles.sidenavDelayedDateCalendar}
                        onChange={(newValue) => setValue(newValue)}
                        sx={{
                          backgroundColor: 'black',
                          color: 'white',
                          position: 'absolute',
                          left: '-350px',
                          bottom: '240px',
                          '& .MuiPickersDay-root': {
                            color: 'white',
                          },
                          '& .Mui-selected': {
                            borderRadius: '0',
                            backgroundColor: '#5ed1c5 !important',
                          },
                          '& .MuiDayCalendar-weekDayLabel': {
                            color: 'white !important',
                          },
                          '& .MuiSvgIcon-root': {
                            color: '#5ed1c5 !important',
                          },
                          '& .MuiPickersCalendarHeader-label': {
                            textTransform: 'uppercase',
                          },
                        }}
                      />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <Image
                src={'/onboarding/ToggleHorisontal.svg'}
                alt="img"
                width={24}
                height={24}
              />
            </div>
            <div className={styles.sidenavDelayedDateIntut}>
              {delayedDate?.format('DD.MM.YYYY')}
            </div>
            <div>
              <button
                onClick={() => setTime(true)}
                className={styles.sidenavDelayedDateButton}
              >
                <span></span>
                <h3>Время</h3>
              </button>
              {time && (
                <div>
                  <div className={styles.sidenavTimePiker}>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      locale="ru"
                    >
                      <DemoContainer components={['TimePicker']}>
                        <DemoItem label="Multi section digital clock">
                          <MultiSectionDigitalClock
                            onChange={handleTimeChange}
                          />
                        </DemoItem>
                      </DemoContainer>
                      <button onClick={() => setTime(false)}>OK</button>
                    </LocalizationProvider>
                  </div>
                </div>
              )}

              <div className="Lead">
                {delayedTime}{' '}
                <Image
                  src={'/onboarding/ToggleHorisontal.svg'}
                  alt={'img'}
                  width={24}
                  height={24}
                />{' '}
              </div>
            </div>
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
                href={delayedTime && delayedDate ? '/queue' : '/summary'}
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
