import Image from 'next/image';
import {
  bigCircle,
  greenLight,
  mediumCircle,
  smallCircle,
  target,
} from '../../public/count-down';

import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <Image
        className={styles.smallCircle}
        src={smallCircle}
        alt="smallCircle"
        width={515}
        height={515}
        priority
      />
      <Image
        className={styles.mediumCircle}
        src={mediumCircle}
        alt="mediumCircle"
        width={791}
        height={791}
        priority
      />
      <Image
        className={styles.bigCircle}
        src={bigCircle}
        alt="bigCircle"
        width={1015}
        height={1015}
        priority
      />
      <div className={styles.greenLight}>
        <Image
          src={greenLight}
          alt="greenLight"
          width={2312}
          height={1672}
          priority
        />
      </div>
      <Image
        className={styles.target}
        src={target}
        alt="target"
        width={470}
        height={450}
        priority
      />
    </div>
  );
};

export default Loader;
