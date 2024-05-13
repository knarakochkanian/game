'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Grid from '../../common/Grid';
import { attack } from '../../public/count-down';
import SideLines from '../../common/SideLines';
import SummaryFooter from '../../components/SummaryFooter';
import BackAndForwardBtns from '../../common/BackAndForwardBtns';
import { attackExample, protectionExample } from '../../data/attacks';
import ActionDetails from '../../components/ActionDetails';
import { protectionIcon } from '../../public/history';
import { useAppSelector } from '../../redux/hooks';
import { selectIsAttacking } from '../../redux/features/generalSlice';

import styles from './summary.module.scss';

const Summary = () => {
  const isAttacking = useAppSelector(selectIsAttacking);
  const router = useRouter();
  
  const onClick = () => {
    console.log('Start attack clicked');
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
        <ActionDetails action={protectionExample} />
      </div>

      <BackAndForwardBtns onBack={onBack} onForward={onForward} />
      <Grid />
      <SideLines />

      <SummaryFooter onClick={onClick} />
    </main>
  );
};

export default Summary;
