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

import styles from './count-down.module.scss';
import { controllerServerAddress } from '../static_variables';

export default function CountDown() {
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

  useEffect(() => {
    if (!fromOnboarding) {
      const countdown = setInterval(() => {
        if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
          setActionCompleted(true);
          clearInterval(countdown);
          const completedActions = proccessActionsToSave(
            currentAction,
            completedActionsFromStorage,
            true
          );

          if (typeof window !== 'undefined') {
            if(!actionCanceled) {
              window.localStorage.setItem(LAST_ACTION_NAME, name);
            }
            

            window.localStorage.setItem(
              COMPLETED_ACTIONS,
              JSON.stringify(completedActions)
            );
          }

          dispatch(resetGeneralState());
          router.push('/');
        } else if (time.seconds > 0) {
          setTime({ ...time, seconds: time.seconds - 1 });
        } else if (time.minutes > 0) {
          setTime({ ...time, minutes: time.minutes - 1, seconds: 59 });
        } else if (time.hours > 0) {
          setTime({ ...time, hours: time.hours - 1, minutes: 59, seconds: 59 });
        }
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [time, router]);

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

  // useEffect(() => {
  //   const socket = new WebSocket(controllerServerAddress);
  //   socket.onmessage = (event) => {
  //     if (event.data === 'cancel pressed') {
  //       cancelCountdown();
  //     }
  //   };

  //   setSocket(socket);

  //   return () => {
  //     socket.close();
  //   };
  // }, []);
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
            className={`${styles.timer} ${fromOnboarding ? styles.z_17 : ''}`}
          >
            <span className={styles.time}>
              {String(time.hours).padStart(2, '0')}
              <span className={styles.hours}>часы</span>
            </span>
            <span className={styles.time}>
              {String(time.minutes).padStart(2, '0')}
              <span className={styles.minutes}>минуты</span>
            </span>
            <div>
              <span className={styles.time}>
                {String(time.seconds).padStart(2, '0')}
                <span className={styles.seconds}>секунды</span>
              </span>
            </div>
          </div>

          <div className={styles.attack}>
            <Image
              src={isAttacking ? attack : protectionIcon}
              alt="attack or protect"
              width={38}
              height={38}
              priority
            />
            <h2 className={styles.attackTitle}>
              {isAttacking ? A_TTACK : P_ROTECTION} {name}
            </h2>
          </div>
        </div>
      </div>

      <Grid />
      <SideLines />
      <Loader isAttacking={isAttacking} />
      <Slashes />

      <Footer cancelCountdown={cancelCountdown} />

      {fromOnboarding && <div className={styles.blur}></div>}

      <Modal name="endingOnboarding" isOpen={fromOnboarding} counter={12}>
        <p>
          После нажатия на кнопку “ПУСК” запустится обратный отчет, и у вас
          будет 15 секунд для отмены. Для отмены необходимо будет нажать
          физическую кнопку “ОТМЕНА”, расположенную правее от дисплея.
        </p>
        <div className="ModalButtons">
          <Link
            onClick={onResetGlobalState}
            href={'/'}
            style={{ color: 'white', padding: '20px' }}
            className="ModalButton1"
          >
            завершить
          </Link>
        </div>
      </Modal>
    </>
  );
}
