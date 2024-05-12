import Image from 'next/image';
import {
  forwardArrow,
  forwardArrowProtect,
  forwardBtnShape,
  forwardBtnShapeProtect,
} from '../../public/summary';

import styles from './ForwardButton.module.scss';

const ForwardButton = ({ onForward }: { onForward: () => void }) => {
  const isAttacking = false;

  return (
    <button onClick={onForward}>
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
    </button>
  );
};

export default ForwardButton;
