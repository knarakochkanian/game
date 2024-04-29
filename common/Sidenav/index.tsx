import React, { useState } from 'react';
import styles from './Sidenav.module.scss';
import Image from 'next/image';
import TitleAndInfo from '../TitleAndInfo';
import regionOptionsUSA from '../../data/USAdropdown';
import DropDown from '../../common/DropDown';

interface SidenavProps {
  isOpen: boolean; // Indicates if the Sidenav is open
  onClose: () => void; // Function to call when closing the Sidenav
}

function Sidenav({ isOpen, onClose }: SidenavProps) {
  return (
    <>
      <div
        id="mySidenav"
        className={styles.sidenav}
        style={{ width: isOpen ? '696px' : '0' }}
      >
        <div className={styles.sidenavWrapper}>
          <div className={styles.sidenavTitle}>
            <h2>Атака #000-001</h2>
            <Image src="home/basket.svg" alt="basket" width={48} height={48} />
          </div>
          
          {isOpen && (
            <DropDown
              title="Регион"
              name="region"
              from={'onboarding'}
              options={regionOptionsUSA}
            />
          )}

          <TitleAndInfo title={'Отложенный запуск'} info={''} />
        </div>
      </div>
    </>
  );
}

export default Sidenav;
