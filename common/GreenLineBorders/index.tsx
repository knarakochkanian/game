import Image from 'next/image';
import { greenLine } from '../../public/news';

import styles from './GreenLineBorders.module.scss';

const classNames = ['upLeft', 'upRight', 'downLeft', 'downRight'];

interface IGreenLineBordersProps {
  width?: number;
}

const GreenLineBorders = ({width = 9}: IGreenLineBordersProps) => {
  return (
    <>
      {classNames.map((className, i) => (
        <Image
          key={i}
          className={styles[className]}
          src={greenLine}
          alt="greenLine"
          width={width}
          height={2}
          priority
        />
      ))}
    </>
  );
};

export default GreenLineBorders;
