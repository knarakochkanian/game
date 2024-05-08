'use client';

import { useState } from 'react';
import Grid from '../../common/Grid';
import Sidenav from '../../common/Sidenav';
import RegionAndOtherButtons from '../RegionAndOtherButtons';
import Help from '../../common/Help';
import SelectFromTwo from '../SelectFromTwo';

import styles from './MainScreen.module.scss';
import { ATTACK, GLOBE, MAP, PROTECTION } from '../../constants';
import { AttackSign, Globe, Map, ProtectSign } from '../../public/main-screen';

const MainScreen = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <main className={styles.mainScreen}>
      <Grid />
      <RegionAndOtherButtons
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
      <SelectFromTwo
        button_1={ATTACK}
        button_2={PROTECTION}
        imgSrc_1={AttackSign}
        imgSrc_2={ProtectSign}
      />
      <Sidenav isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <Help />
      <SelectFromTwo
        button_1={GLOBE}
        button_2={MAP}
        imgSrc_1={Globe}
        imgSrc_2={Map}
        name='mapOrGlobe'
      />
    </main>
  );
};

export default MainScreen;
