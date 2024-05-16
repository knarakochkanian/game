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
import { selectDamgeLevel, selectIsAttacking, selectPickedCountriesObjects, selectSectors } from '../../redux/features/generalSlice';

import styles from './summary.module.scss';
import { countSelectedOptions } from '../../helpers';

const Summary = () => {
  const router = useRouter();
  const selectedCountries = useAppSelector(selectPickedCountriesObjects);
  const damageLevel = useAppSelector(selectDamgeLevel);
  const isAttacking = useAppSelector(selectIsAttacking);
  const industrySectors = useAppSelector(selectSectors);
  const numberOfSelectedSectors =
    countSelectedOptions(industrySectors, 'selected') !== 0
      ? countSelectedOptions(industrySectors, 'selected')
      : null;
  
  
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
        <ActionDetails action={attackExample} />
      </div>

      <BackAndForwardBtns onBack={onBack} onForward={onForward} />
      <Grid />
      <SideLines />

      <SummaryFooter onClick={onClick} />
    </main>
  );
};

export default Summary;
