'use client';

import { useState } from 'react';
import Grid from '../../common/Grid';
import Sidenav from '../../common/Sidenav';
import AttackAndProtect from '../AttackAndProtect';
import RegionAndOtherButtons from '../RegionAndOtherButtons';

import styles from './MainScreen.module.scss';
import Help from '../../common/Help';

const MainScreen = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <main className={styles.mainScreen}>
      <Grid />
      <RegionAndOtherButtons
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
      <AttackAndProtect />
      <Sidenav isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <Help />
    </main>
  );
};

export default MainScreen;
