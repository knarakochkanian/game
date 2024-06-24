import Image from 'next/image';
import {
  bigCircle,
  bigCircleBlue,
  blueLight,
  greenLight,
  mediumCircle,
  mediumCircleBlue,
  smallCircle,
  smallCircleBlue,
  target,
} from '../../public/count-down';

import styles from './Loader.module.scss';

const Loader = ({ isAttacking }: { isAttacking: boolean }) => {
  return (
    <div className={styles.loader}>
      <Image
        className={styles.smallCircle}
        src={isAttacking ? smallCircle : smallCircleBlue}
        alt="smallCircle"
        width={300}
        height={300}
        priority
      />
      <Image
        className={styles.mediumCircle}
        src={isAttacking ? mediumCircle : mediumCircleBlue}
        alt="mediumCircle"
        width={576}
        height={576}
        priority
      />
      <Image
        className={styles.bigCircle}
        src={isAttacking ? bigCircle : bigCircleBlue}
        alt="bigCircle"
        width={800}
        height={800}
        priority
      />
      <div className={styles.light}>
        <Image
          src={isAttacking ? greenLight : blueLight}
          alt="light"
          width={1318}
          height={825}
          priority
        />
      </div>
      <Image
        className={styles.target}
        src={target}
        alt="target"
        width={270}
        height={250}
        priority
      />
    </div>
  );
};

export default Loader;
