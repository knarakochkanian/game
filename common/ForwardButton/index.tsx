import Image from 'next/image';
import Link from 'next/link';
import {
  forwardArrow,
  forwardArrowProtect,
  forwardBtnShape,
  forwardBtnShapeProtect,
} from '../../public/summary';
import { useAppSelector } from '../../redux/hooks';
import { selectIsAttacking } from '../../redux/features/generalSlice';
import { COUNT_DOWN } from '../../constants';

import styles from './ForwardButton.module.scss';

const ForwardButton = ({ onForward }: { onForward: () => void }) => {
  const isAttacking = useAppSelector(selectIsAttacking);

  return (
    <Link href={COUNT_DOWN} onClick={onForward}>
      <Image
        src={isAttacking ? forwardArrow : forwardArrowProtect}
        className={styles.forwardArrow}
        alt="forwardArrow"
        width={96}
        height={96}
        priority
      />

      <Image
        src={isAttacking ? forwardBtnShape : forwardBtnShapeProtect}
        className={styles.forwardBtnShape}
        alt="forwardBtnShape"
        width={139}
        height={703}
        priority
      />
    </Link>
  );
};

export default ForwardButton;
