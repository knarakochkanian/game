'use client';

import { useState } from 'react';
import Grid from '../../common/Grid';
import Sidenav from '../../common/Sidenav';
import RegionAndOtherButtons from '../RegionAndOtherButtons';
import Help from '../../common/Help';
import SelectFromTwo from '../SelectFromTwo';
import { ATTACK, GLOBE, MAP, PROTECTION } from '../../constants';
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
  const [isAttacking, setIsAttacking] = useState(true);
  const [globeActive, setGlobeActive] = useState(true);

  return (
    <main className={styles.mainScreen}>
      <Grid />
      <RegionAndOtherButtons
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
          globeActive ? Map : isAttacking ? MapActive : MapActiveUnderProtection
        }
        name="mapOrGlobe"
      />

      {/* <Globe visible={globeActive} /> */}

      {true && <QueueModal queue={queue} />}

      <HistoryAndNewsBtns />
    </main>
  );
};

export default MainScreen;
