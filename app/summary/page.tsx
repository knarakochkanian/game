'use client';

import Image from 'next/image';
import Grid from '../../common/Grid';
import AttackDetails from '../../components/AttackDetails';
import { attack } from '../../public/count-down';
import SideLines from '../../common/SideLines';
import SummaryFooter from '../../components/SummaryFooter';
import BackAndForwardBtns from '../../common/BackAndForwardBtns';

import styles from './summary.module.scss';

const Summary = () => {
  const onClick = () => {
    console.log('Start attack clicked');
  };
  const onBack = () => {
    console.log('onBack');
  };
  const onForward = () => {
    console.log('onForward');
  };

  return (
    <main className={styles.main}>
      <div className={styles.attackCtn}>
        <Image
          className={styles.attackImg}
          src={attack}
          alt="attack"
          width={80}
          height={80}
          priority
        />
        <AttackDetails />
      </div>

      <BackAndForwardBtns onBack={onBack} onForward={onForward} />
      <Grid />
      <SideLines />

      <SummaryFooter onClick={onClick} />
    </main>
  );
};

export default Summary;
