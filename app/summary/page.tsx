'use client';

import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Grid from '../../common/Grid';
import { attack } from '../../public/count-down';
import SideLines from '../../common/SideLines';
import SummaryFooter from '../../components/SummaryFooter';
import BackAndForwardBtns from '../../common/BackAndForwardBtns';
import { protectionIcon } from '../../public/history';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  resetGeneralState,
  selectComfirmedFromOnboarding,
  selectCurrentAction,
  selectIsAttacking,
  setCurrentActionDate,
  setCurrentActionNews,
} from '../../redux/features/generalSlice';
import { ACTIONS_IN_QUEUE, COUNT_DOWN, top_capitalization } from '../../constants';
import { formatDate, getItemFromStorage } from '../../helpers';
import Modal from '../../common/Modals/Modal';
import {
  WebSocketContext,
  WebSocketContextProps,
} from '../../contexts/WebSocketContext';

import styles from './summary.module.scss';
import proccessNewsData from '../../helpers/proccessNewsData';
import getIndustryNameInEnglish from '../../helpers/getIndustryNameInEnglish';

const ActionDetails = dynamic(() => import('../../components/ActionDetails'), {
  ssr: false,
});

const Summary = () => {
  const [learningStart, setLearningStart] = useState(false);
  const dispatch = useAppDispatch();
  const [actionsInQueueFromStorage, setActionsInQueueFromStorage] = useState<
    IAction[] | undefined
  >();
  const router = useRouter();
  const isAttacking = useAppSelector(selectIsAttacking);
  const currentAction: IAction | null = useAppSelector(selectCurrentAction);
  const fromOnboarding = useAppSelector(selectComfirmedFromOnboarding);
  const webSocketContext = useContext(
    WebSocketContext
  ) as WebSocketContextProps;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const actionsInQueueFromStorage = getItemFromStorage(
        ACTIONS_IN_QUEUE,
        window
      );
      setActionsInQueueFromStorage(actionsInQueueFromStorage);
    }
  }, []);

  const onStartAction = () => {
    switch (currentAction?.isCompleted) {
      case false:
        const actionsInQueue = [
          ...(actionsInQueueFromStorage as IAction[]),
          currentAction,
        ];

        if (typeof window !== 'undefined') {
          window.localStorage.setItem(
            'actionsInQueue',
            JSON.stringify(actionsInQueue)
          );
        }

        break;
      case null:
        const currentDate = formatDate(new Date());
        dispatch(setCurrentActionDate(currentDate));
        const { selectedCountries, industrySectors } = currentAction;
        const selectedCountryNames = selectedCountries
          .filter((c) => c.code)
          .map((c) => c.name);
        const selectedSectorsNames = industrySectors
          .filter((s) => s.options.some((o) => o.selected))
          .map((s) => s.title)
          .map((t) => getIndustryNameInEnglish(t));
        const topCapitalizationSector = industrySectors.find(s => s.title === top_capitalization)
          
        let news: INews[] = proccessNewsData(
          selectedCountryNames,
          currentDate,
          selectedSectorsNames,
          topCapitalizationSector as ISector
        );

        dispatch(setCurrentActionNews(news));
        router.push(COUNT_DOWN);
        break;
    }
  };

  const onBack = () => {
    setTimeout(() => {
      dispatch(resetGeneralState());
    }, 10);

    if (
      webSocketContext?.socket &&
      webSocketContext.socket.readyState === WebSocket.OPEN
    ) {
      webSocketContext.socket.send('cancel');
    }

    router.back();
  };

  const onForward = () => {
    console.log('onForward');
  };

  return (
    <main className={styles.main}>
      <div className={styles.imgCtn}>
        <Image
          className={styles.img}
          src={isAttacking ? attack : protectionIcon}
          alt="attack or protection"
          width={38}
          height={38}
          priority
        />
        <ActionDetails
          learningStart={learningStart}
          setLearningStart={setLearningStart}
          action={currentAction as IAction}
        />
      </div>
      <BackAndForwardBtns onBack={onBack} onForward={onForward} />
      <Grid />
      <SideLines />

      <SummaryFooter onClick={onStartAction} />
      {fromOnboarding && (
        <div
          className={`${styles.blur} ${learningStart ? styles.z_15 : ''}`}
        ></div>
      )}

      <Modal name="learningStart" isOpen={learningStart} counter={11}>
        <p>
          Для запуска задачи нужно нажать физическую кнопку “Пуск”,
          расположенную правее от дисплея.
        </p>
        <div className="ModalButtons">
          <Link
            href={COUNT_DOWN}
            style={{ color: 'white', padding: '20px' }}
            className="ModalButton1"
          >
            далее
          </Link>
          <Link href={'/'} className="SecondarySmall">
            <span className="TypoBodyBigLink">
              <button onClick={() => {}}>пропустить</button>
            </span>
          </Link>
        </div>
      </Modal>
    </main>
  );
};

export default Summary;
