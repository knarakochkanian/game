'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../../components/Footer';
import { attack } from '../../public/count-down';
import Slashes from '../../common/Slashes';
import Loader from '../../common/Loader';
import SideLines from '../../common/SideLines';
import Grid from '../../common/Grid';
import {
  ACTIONS_IN_QUEUE,
  A_TTACK,
  COMPLETED_ACTIONS,
  LAST_ACTION_NAME,
  P_ROTECTION,
} from '../../constants';
import { protectionIcon } from '../../public/history';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  resetGeneralState,
  selectComfirmedFromOnboarding,
  selectCurrentAction,
  selectIsAttacking,
  setCurrentAction,
  setDamageLevel,
} from '../../redux/features/generalSlice';
import { getItemFromStorage, getNextActionName } from '../../helpers';
import proccessActionsToSave from '../../helpers/proccessActionsToSave';
import Modal from '../../common/Modals/Modal';
import {
  bigCircle,
  bigCircleBlue,
  blueLight,
  greenLight,
  mediumCircle,
  mediumCircleBlue,
  smallCircle,
  smallCircleBlue,
  target,
} from '../../public/count-down';

import styles from './count-down.module.scss';
import './count-down-onboarding.css';
import { controllerServerAddress } from '../static_variables';

export default function CountDownOnboarding() {
  const fromOnboarding = useAppSelector(selectComfirmedFromOnboarding);
  const [lastActionName, setLastActionName] = useState<string | null>();
  const dispatch = useAppDispatch();
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 15 });
  const isAttacking = useAppSelector(selectIsAttacking);
  const currentAction = useAppSelector(selectCurrentAction) as IAction;
  const router = useRouter();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [completedActionsFromStorage, setCompletedActionsFromStorage] =
    useState<IAction[] | undefined>();
  const [actionsInQueueFromStorage, setActionsInQueueFromStorage] = useState<
    IAction[] | undefined
  >();

  const [name, setName] = useState('');

  const [actionCompleted, setActionCompleted] = useState(false);
  const [actionCanceled, setActionCanceled] = useState(false);

  useEffect(() => {
    const name = lastActionName
      ? getNextActionName(lastActionName)
      : '#000-001';
    setName(name);
  }, [lastActionName]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const lastActionName = window.localStorage.getItem('lastActionName');
      console.log('lastActionName', lastActionName);

      setLastActionName(lastActionName);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const actionsInQueueFromStorage = getItemFromStorage(
        ACTIONS_IN_QUEUE,
        window
      );
      const actions = getItemFromStorage(COMPLETED_ACTIONS, window);
      setCompletedActionsFromStorage(actions);
      setActionsInQueueFromStorage(actionsInQueueFromStorage);
    }
  }, []);

  const cancelCountdown = () => {
      setTimeout(() => {
        dispatch(resetGeneralState());
      }, 10);
    dispatch(setDamageLevel(null));
    return router.push('/');
    // if (!actionCompleted && actionsInQueueFromStorage) {
    //   const actionsInQueue = proccessActionsToSave(
    //     currentAction,
    //     actionsInQueueFromStorage,
    //     false
    //   );
    // if (typeof window !== 'undefined') {
    //   // window.localStorage.setItem(LAST_ACTION_NAME, name);

    // // window.localStorage.setItem(ACTIONS_IN_QUEUE, JSON.stringify(actionsInQueue));
    // }
    // }
    setTime({ ...time, hours: 0, minutes: 0, seconds: 0 });
  };
  const onResetGlobalState = () => {
    setTimeout(() => {
      dispatch(resetGeneralState());
    }, 2000);
  };

  return (
    <>
      <div className={styles.countdownContainer}>
        <h5>запуск</h5>

        <div className={styles.timerAndAttackCtn}>
          <div
            className={`${styles.timer} ${styles.z_17}`}
          >
            <span className={styles.time}>
              00
              <span className={styles.hours}>часы</span>
            </span>
            <span className={styles.time}>
              00
              <span className={styles.minutes}>минуты</span>
            </span>
              <span className={styles.time}>
                15
                <span className={styles.seconds}>секунды</span>
              </span>
          </div>

          <div className={styles.attack}>
            <Image
              src={isAttacking ? attack : protectionIcon}
              alt="attack or protect"
              width={80}
              height={80}
              priority
            />
            <h2 className={styles.attackTitle}>
              {A_TTACK} {name}
            </h2>
          </div>
        </div>
      </div>

      <Grid />
      <SideLines />
      {/* <Loader isAttacking={isAttacking} /> */}
      <div className={styles.loader}>
        <Image
          className={styles.smallCircle}
          src={smallCircle}
          alt="smallCircle"
          width={300}
          height={300}
          priority
        />
        <Image
          className={styles.mediumCircle}
          src={mediumCircle}
          alt="mediumCircle"
          width={576}
          height={576}
          priority
        />
        <Image
          className={styles.bigCircle}
          src={bigCircle}
          alt="bigCircle"
          width={800}
          height={800}
          priority
        />
        <div className={styles.light}>
          <Image
            src={greenLight}
            alt="light"
            width={1318}
            height={825}
            priority
          />
        </div>
        <Image
          className={styles.target}
          src={target}
          alt="target"
          width={270}
          height={250}
          priority
        />
      </div>
      <Slashes />

      {/* <Footer cancelCountdown={cancelCountdown} /> */}
      <div className={`${styles.buttonContainer}`}>
        <button>
          <h3>
            Для отмены атаки нажмите кнопку
            <span> ОТМЕНА</span>
          </h3>
        </button>
      </div>
      

      {fromOnboarding && <div className={styles.blur}></div>}

      <Modal name="endingOnboarding" isOpen={true} counter={12}>
        <p>
          После нажатия на кнопку “ПУСК” запустится обратный отчет, и у вас
          будет 15 секунд для отмены. Для отмены необходимо будет нажать
          физическую кнопку “ОТМЕНА”, расположенную правее от дисплея.
        </p>
        <div className="ModalButtons ModalButtons_last">
          <Link
            onClick={onResetGlobalState}
            href={'/'}
            style={{ color: 'white', padding: '0px', textDecoration: 'none', textTransform: 'uppercase',
              fontSize: "13.18px",
              fontWeight: "500",
              lineHeight: "15.82px",
              letterSpacing: "0.01em",
              textAlign: "left",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '112px',
              height: '32px',
            }}
            className="ModalButton1"
          >
            завершить
          </Link>
        </div>
      </Modal>
    </>
  );
}
