'use client';

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
import { news_2 } from '../../data/news';
import launchConsequences from '../../data/launchConsequences';
import { trash } from '../../public/summary';

import styles from './SidenavInMain.module.scss';
import { ChangeEvent, useEffect, useState } from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { type DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, MultiSectionDigitalClock } from '@mui/x-date-pickers';
import useCloseModal from '../../hooks/useCloseModal';
import {
  setCloseSelectionIfChanged,
  setResetMapIfChanged,
} from '../../redux/features/helpersSlice';
import TrashModal from '../TrashModal';
import { getDelayedDateWithTime } from '../../helpers/helpers_1';
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
  let trashCallBack = () => {
    dispatch(setResetMapIfChanged());
    dispatch(resetGeneralState());
    dispatch(setCloseSelectionIfChanged());

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
  const [lastActionName, setLastActionName] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [delayed, setDelayed] = useState(false);
  const [time, setTime] = useState(false);
  const [day, setDay] = useState(false);
  const [delayedDate, setDelayedDate] = useState<Dayjs | null>(null);
  const [delayedTime, setDelayedTime] = useState<string | null>(null);

  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;

    setIsSwitchOn(checked);
    setDelayed(checked);
  };
  const handelOnDatePikerOpen = () => {
    setDay(true);
  };
  // @ts-ignore
  const handleDateChange: DateTimePickerProps<Dayjs>['onChange'] = (
    newValue: any
  ) => {
    setDelayedDate(newValue);
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
      news: news_2,
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
            trashCallBack={trashCallBack}
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
                src={trash}
                alt="trash"
                className={styles.trash}
                width={23}
                height={23}
              />
            </button>
          </div>

          <div className="AccordionsWrap">
            <RegionAccordion selectedCountries={selectedCountries} />
            <IndustryAccordion industrySectors={industrySectors} />
            <DamageLevelInfo damageLevel={damageLevel} />
          </div>

          <div
            className={styles.sidenavSquare}
            style={{ display: removeModalDate ? 'none' : 'flex', zIndex: 10 }}
          >
            <h5 style={{ paddingLeft: '24px' }}>Отложенный запуск</h5>
            <Switch isOn={isSwitchOn} handleSwitchChange={handleSwitchChange} />
          </div>
          <div
            className={styles.sidenavDelayedWrraper}
            style={{ display: delayed ? 'block' : 'none' }}
          >
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <button>
                  <h3 style={{ color: '#525252' }}>Дата</h3>
                </button>
                <DatePicker
                  label="Controlled picker"
                  value={delayedDate}
                  className={styles.sidenavDelayedDate}
                  onChange={handleDateChange}
                />
              </LocalizationProvider>
              <div className="Lead">
                {delayedDate?.format('DD.MM.YYYY')}
                <Image
                  src={'/onboarding/ToggleHorisontal.svg'}
                  alt={'img'}
                  width={24}
                  height={24}
                />
              </div>
            </div>
            <div>
              <button onClick={() => setTime(true)}>
                <h3 style={{ color: '#525252' }}>Время</h3>
              </button>
              {time && (
                <div>
                  <div className={styles.sidenavTimePiker}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                <Link
                  href={delayedTime && delayedDate ? '/queue' : '/summary'}
                  onClick={onSetCurrentAction}
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
                    height={12}
                    width={12}
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
