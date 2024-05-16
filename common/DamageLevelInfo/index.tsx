import Image from 'next/image';
import { minusSign } from '../../public/main-screen';
import { useAppSelector } from '../../redux/hooks';
import { selectDamgeLevel } from '../../redux/features/generalSlice';

import styles from './DamageLevelInfo.module.scss';

const DamageLevelInfo = () => {
  const damageLevel = useAppSelector(selectDamgeLevel);

  return (
    <div className={styles.damageLevelInfo}>
      <div className={styles.titleAndInfo}>
        <span className={styles.title}>Ущерб</span>
        <span className={styles.info}>{damageLevel ? damageLevel : ''}</span>
      </div>

      <Image
        className={styles.minusSign}
        src={minusSign}
        alt="minusSign"
        width={40}
        height={40}
        priority
      />
    </div>
  );
};

export default DamageLevelInfo;
