import Image from 'next/image';
import { blueLine, greenLine } from '../../public/news';
import { useAppSelector } from '../../redux/hooks';
import { selectIsAttacking } from '../../redux/features/generalSlice';

import styles from './GreenLineBorders.module.scss';

const classNames = ['upLeft', 'upRight', 'downLeft', 'downRight'];

interface IGreenLineBordersProps {
  width?: number;
}

const GreenLineBorders = ({ width = 9 }: IGreenLineBordersProps) => {
  const isAttacking = useAppSelector(selectIsAttacking);

  return (
    <>
      {classNames.map((className, i) => (
        <Image
          key={i}
          className={styles[className]}
          src={isAttacking ? greenLine : blueLine}
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
