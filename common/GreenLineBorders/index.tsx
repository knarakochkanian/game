import Image from 'next/image';
import { greenLine } from '../../public/news';

import styles from './GreenLineBorders.module.scss';

const classNames = ['upLeft', 'upRight', 'downLeft', 'downRight'];

const GreenLineBorders = () => {
  return (
    <>
      {classNames.map((className, i) => (
        <Image
          key={i}
          className={styles[className]}
          src={greenLine}
          alt="greenLine"
          width={20}
          height={2}
          priority
        />
      ))}
    </>
  );
};

export default GreenLineBorders;
