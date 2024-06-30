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
          width={280}
          height={28}
        />
        <div className={styles.targetTextContainer}>
          <div className={styles.targetTextWest}>
            <span>запад</span>
          </div>
          <div className={styles.targetTextNorth}>
            <span>север</span>
          </div>
          <Image
            className={styles.targetSvgMain}
            src={'/target/target.svg'}
            alt="target"
            width={221}
            height={212}
          />
          <div className={styles.targetTextSouth}>
            <span>юг</span>
          </div>
          <div className={styles.targetTextEast}>
            <span>восток</span>
          </div>
        </div>
        <Image
          className={styles.targetArrows}
          src={'/target/arrowTargetRight.svg'}
          alt="target"
          width={280}
          height={28}
        />
      </div>
    </section>
  );
};

export default Target;
