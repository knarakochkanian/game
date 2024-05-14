'use client';
import React, { useState, useEffect } from 'react';
import { io, Socket as IOSocket } from 'socket.io-client';
import Grid from '../../common/Grid';
import Sidenav from '../../common/Sidenav';
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
import { Socket } from 'net';
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
import queue from '../../data/queue';
import { useAppSelector } from '../../redux/hooks';
import { selectIsAttacking } from '../../redux/features/generalSlice';

import styles from './MainScreen.module.scss';
import dynamic from 'next/dynamic';
import { MapType } from '../Map/map.types';

const WorldMap = dynamic(
  () => import('../Map/map.component').then((mod) => mod.WorldMap),
  { ssr: false }
);

const MainScreen = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [globeActive, setGlobeActive] = useState(true);
  const [socket, setSocket] = useState<Socket | null>(null);
  const isAttacking = useAppSelector(selectIsAttacking);

  // useEffect(() => {
  //   let socket = new WebSocket('ws://britishellie.ru:8888');
  //   console.log(socket, 'socket');
  //   socket.onopen = (ev) => {
  //     console.log(ev, 'onopen');
  //   };
  //
  //   socket.onclose = (ev) => {
  //     console.log(ev, 'onclose');
  //   };
  //
  //   socket.onerror = (ev) => {
  //     console.log(ev, 'onerror');
  //   };
  //   socket.onmessage = (ev) => {
  //     console.log(ev, 'onmessage');
  //   };
  // }, []);

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

      {false && <QueueModal queue={queue} />}

      <Sidenav isOpen={false} onClose={() => setDrawerOpen(false)} />
      <HistoryAndNewsBtns />
    </main>
  );
};

export default MainScreen;
