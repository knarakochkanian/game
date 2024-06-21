import Image from 'next/image';

import styles from './Target.module.scss';

const Target = () => {
  return (
    <section className={styles.target}>
      <div className={styles.targetWrapper}>
        <Image
          className={styles.targetArrows}
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
          width={221}
          height={212}
        />
        <div className={styles.targetText}>
          <span>восток</span>
        </div>
        <Image
          className={styles.targetArrows}
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
