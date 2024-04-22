import Image from 'next/image';
import { greenLight, loader } from '../../public/count-down';

import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <Image src={loader} alt="loader" width={1015} height={1015} priority />
      <div className={styles.greenLight}>
        <Image
          src={greenLight}
          alt="greenLight"
          width={2312}
          height={1672}
          priority
        />
      </div>
    </div>
  );
};

export default Loader;
