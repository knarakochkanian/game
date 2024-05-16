import Image from 'next/image';
import FooterButton from '../../common/FooterButton';
import { START, startAttackTitle } from '../../constants';

import styles from './Target.module.scss';

const Target = () => {
  return (
    <section className={styles.target}>
      <div>
        <Image
          className={styles.targetSvgMain}
          src={'/target/arrowTargetLeft.svg'}
          alt="target"
          width={480}
          height={48}
        />
        <div className={styles.targetText}>
          <span>запад</span>
        </div>
        <Image
          className={styles.targetSvgMain}
          src={'/target/target.svg'}
          alt="target"
          width={470}
          height={450}
        />
        <div className={styles.targetText}>
          <span>восток</span>
        </div>
        <Image
          className={styles.targetSvgMain}
          src={'/target/arrowTargetRight.svg'}
          alt="target"
          width={480}
          height={48}
        />
      </div>
    </section>
  );
};

export default Target;
