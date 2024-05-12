'use client';
import { useState, useEffect } from 'react';
import { io, Socket as IOSocket } from 'socket.io-client';
import Grid from '../../common/Grid';
import Sidenav from '../../common/Sidenav';
import RegionAndOtherButtons from '../RegionAndOtherButtons';
import Help from '../../common/Help';
import SelectFromTwo from '../SelectFromTwo';
import { ATTACK, GLOBE, MAP, PROTECTION } from '../../constants';
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
import Globe from '../Globe';
import QueueModal from '../QueueModal';
import queue from '../../data/queue';

import styles from './MainScreen.module.scss';

const MainScreen = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [globeActive, setGlobeActive] = useState(true);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isAttacking, setIsAttacking] = useState(true);

  useEffect(() => {
    // Establish WebSocket connection
    let socket = new WebSocket('ws://britishellie.ru:8888');
    console.log(socket, '44444');
    socket.onopen = (ev) => {
      console.log(ev, 'onopen');
    };

    socket.onclose = (ev) => {
      console.log(ev, 'onclose');
    };

    socket.onerror = (ev) => {
      console.log(ev, 'onerror');
    };
    socket.onmessage = (ev) => {
      console.log(ev, 'onmessage');
    };
    // socket?.onmessage((event) => {
    //   console.log('event', event);
    // });
    //   const newSocket = io('ws://britishellie.ru:8888', {
    //   transports: ['websocket'],
    // });

    // Log successful connection
    // newSocket.on('connect', () => {
    //   console.log('WebSocket connected:', newSocket.id);
    // });
    //
    // // Log messages received from the server
    // newSocket.on('message', (message) => {
    //   console.log('Message received:', message);
    // });
    //
    // // Handle any errors
    // newSocket.on('connect_error', (err) => {
    //   console.error('Connection Error:', err);
    // });
    //
    // // @ts-ignore
    // setSocket(newSocket);
    //
    // return () => {
    //   newSocket.close();
    //   console.log('WebSocket disconnected');
    // };
  }, []);

  return (
    
      <main className={styles.mainScreen}>
        <Grid />
        <RegionAndOtherButtons
          isAttacking={isAttacking}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
        />
        <SelectFromTwo
          setFirstActive={setIsAttacking}
          button_1={ATTACK}
          button_2={PROTECTION}
          imgSrc_1={isAttacking ? AttackSignActive : AttackSign}
          imgSrc_2={isAttacking ? ProtectSign : ProtectActive}
        />
        <Sidenav isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
        <Help />
        <h1>{String(isAttacking)}</h1>
        {String(globeActive)}
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
            globeActive
              ? Map
              : isAttacking
              ? MapActive
              : MapActiveUnderProtection
          }
          name="mapOrGlobe"
        />

        {/* <Globe visible={globeActive} /> */}

        {false && <QueueModal queue={queue} />}

        <HistoryAndNewsBtns />
      </main>
  );
};

export default MainScreen;
