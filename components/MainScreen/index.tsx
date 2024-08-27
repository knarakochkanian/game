'use client';
import React, { useState, useEffect } from 'react';
import Grid from '../../common/Grid';
import RegionAndOtherButtons from '../RegionAndOtherButtons';
import Help from '../../common/Help';
import SelectFromTwo from '../SelectFromTwo';
import {
  ATTACK,
  ATTACK_OR_PROTECT,
  GLOBE,
  MAP,
  PROTECTION,
} from '../../constants';
import {
  AttackSign,
  AttackSignActive,
  Globe as globe,
  GlobeActive,
  GlobeUnderProtection,
  Map,
  MapActive,
  MapActiveUnderProtection,
  ProtectActive,
  ProtectSign,
} from '../../public/main-screen';
import HistoryAndNewsBtns from '../../common/HistoryAndNewsBtns';
import QueueModal from '../QueueModal';
import { useAppSelector } from '../../redux/hooks';
import {
  selectCurrentAction,
  selectIsAttacking,
  selectOnboardingBlur,
  selectPickedCountriesObjects,
  selectSideNavIsOpen,
} from '../../redux/features/generalSlice';
import dynamic from 'next/dynamic';
import { MapType } from '../Map/map.types';
import Target from '../Target';
import SidenavInMain from '../../common/SidenavInMain';
import ModalContainer from '../../common/Modals/ModalContainer';
import SimCards from '../../common/SimCards';
import { simCards, waves } from '../../data/connectionData';
import Waves from '../../common/Waves';
import SystemState from '../../common/SystemState';
import { useDeviceConnection } from '../../contexts/WebSocketContext';

import styles from './MainScreen.module.scss';
import Box from '@mui/material/Box';

const WorldMap = dynamic(
  () => import('../Map/InteractiveMap.component').then((mod) => mod.WorldMap),
  { ssr: false }
);

interface MainScreenProps {
  isVisible: boolean;
}

const MainScreen = ({ isVisible }: MainScreenProps) => {
  const sideNavIsOpen = useAppSelector(selectSideNavIsOpen);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [globeActive, setGlobeActive] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleWave, setModalVisibleWave] = useState(false);
  const [modalVisibleSystem, setModalVisibleSystem] = useState(false);
  const { lastMessage, pingFailed } = useDeviceConnection()!;
  const isAttacking = useAppSelector(selectIsAttacking);
  const selectedCountries = useAppSelector(selectPickedCountriesObjects);
  const currentAction = useAppSelector(selectCurrentAction) as IAction;

  useEffect(() => {
    const interval = setInterval(() => {
      const storedActions = localStorage.getItem('actionsInQueue');
      const actionsInQueue = storedActions ? JSON.parse(storedActions) : [];

      const storedCompletedActions = localStorage.getItem('completedActions');
      const completedActions = storedCompletedActions
        ? JSON.parse(storedCompletedActions)
        : [];

      const now = new Date();
      let actionsCompleted = false;

      const remainingActions = actionsInQueue.filter((action: any) => {
        const actionDate = new Date(action.date.split('.').reverse().join('-'));
        console.log(actionDate, 'actionDate');
        if (now.getTime() >= actionDate.getTime()) {
          completedActions.push({ ...action, isCompleted: true });
          actionsCompleted = true;
          return false;
        }

        return true;
      });
      console.log(remainingActions, 'remainingActions');
      localStorage.setItem('actionsInQueue', JSON.stringify(remainingActions));
      localStorage.setItem(
        'completedActions',
        JSON.stringify(completedActions)
      );

      if (actionsCompleted) {
        window.location.reload();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (lastMessage?.data === 'sim pressed') {
      setModalVisible(true);
    }

    if (lastMessage?.data === 'wave pressed') {
      setModalVisibleWave(true);
    }

    if (lastMessage?.data === 'ready pressed') {
      setModalVisibleSystem(true);
    }
  }, [lastMessage]);

  return (
    <main className={styles.mainScreen}>
      <Grid />
      <RegionAndOtherButtons
        isAttacking={isAttacking}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
      <SelectFromTwo
        button_1={ATTACK}
        button_2={PROTECTION}
        imgSrc_1={isAttacking ? AttackSignActive : AttackSign}
        imgSrc_2={isAttacking ? ProtectSign : ProtectActive}
        name={ATTACK_OR_PROTECT}
      />
      {modalVisible && (
        <ModalContainer setModalClose={() => setModalVisible(false)}>
          <SimCards simCards={simCards} />
        </ModalContainer>
      )}
      {modalVisibleWave && (
        <ModalContainer setModalClose={() => setModalVisibleWave(false)}>
          <Waves deviceConnected={!pingFailed} waves={waves} />
        </ModalContainer>
      )}
      {modalVisibleSystem && (
        <ModalContainer setModalClose={() => setModalVisibleSystem(false)}>
          <SystemState isOn={!pingFailed} />
        </ModalContainer>
      )}

      <Target />
      <WorldMap mapType={globeActive ? MapType.sphere : MapType.plane} />
      {isVisible && <Help />}
      <SelectFromTwo
        setFirstActive={setGlobeActive}
        button_1={GLOBE}
        button_2={MAP}
        imgSrc_1={
          globeActive
            ? isAttacking
              ? GlobeActive
              : GlobeUnderProtection
            : globe
        }
        imgSrc_2={
          globeActive ? Map : isAttacking ? MapActive : MapActiveUnderProtection
        }
        name="mapOrGlobe"
      />
      <QueueModal />
      <SidenavInMain
        isOpen={sideNavIsOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <HistoryAndNewsBtns />
    </main>
  );
};

export default MainScreen;
