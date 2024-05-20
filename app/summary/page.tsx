'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
  selectCurrentAction,
  selectIsAttacking,
  setCurrentActionDate,
} from '../../redux/features/generalSlice';
import {
  ACTIONS_IN_QUEUE,
  COUNT_DOWN,
} from '../../constants';
import { formatDate, getItemFromStorage } from '../../helpers';

import styles from './summary.module.scss';

const ActionDetails = dynamic(() => import('../../components/ActionDetails'), { ssr: false });

const Summary = () => {
  const dispatch = useAppDispatch();
  const [actionsInQueueFromStorage, setActionsInQueueFromStorage] = useState<
    IAction[] | undefined
  >();
  const router = useRouter();
  const isAttacking = useAppSelector(selectIsAttacking);
  const currentAction: IAction | null = useAppSelector(selectCurrentAction);

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
        router.push(COUNT_DOWN);
        break;
    }
  };

  const onBack = () => router.back();

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
          width={80}
          height={80}
          priority
        />
        <ActionDetails action={currentAction as IAction} />
      </div>

      <BackAndForwardBtns onBack={onBack} onForward={onForward} />
      <Grid />
      <SideLines />

      <SummaryFooter onClick={onStartAction} />
    </main>
  );
};

export default Summary;
