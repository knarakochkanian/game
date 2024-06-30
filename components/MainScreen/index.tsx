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
import { useWebSocket } from '../../contexts/WebSocketContext';

import styles from './MainScreen.module.scss';
import Box from '@mui/material/Box';

const WorldMap = dynamic(
  () => import('../Map/InteractiveMap.component').then((mod) => mod.WorldMap),
  { ssr: false }
);

const MainScreen = () => {
  const sideNavIsOpen = useAppSelector(selectSideNavIsOpen);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [globeActive, setGlobeActive] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleWave, setModalVisibleWave] = useState(false);
  const [modalVisibleSystem, setModalVisibleSystem] = useState(false);
  const { socket, pingFailed } = useWebSocket()!;
  const isAttacking = useAppSelector(selectIsAttacking);
  const selectedCountries = useAppSelector(selectPickedCountriesObjects);

  useEffect(() => {
    if (!socket) return;
    const handleSocketMessage = (event: MessageEvent) => {
      if (event.data === 'sim pressed') {
        setModalVisible(true);
      }
      if (event.data === 'wave pressed') {
        setModalVisibleWave(true);
      }
      if (event.data === 'ready pressed') {
        setModalVisibleSystem(true);
      }
    };

    socket.addEventListener('message', handleSocketMessage);

    return () => {
      socket.removeEventListener('message', handleSocketMessage);
    };
  }, [socket]);

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
          <Waves deviceConnected={true} waves={waves} />
        </ModalContainer>
      )}
      {modalVisibleSystem && (
        <ModalContainer setModalClose={() => setModalVisibleSystem(false)}>
          <SystemState isOn={pingFailed} />
        </ModalContainer>
      )}

      <Target />
      <WorldMap mapType={globeActive ? MapType.sphere : MapType.plane} />
      <Help />
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
