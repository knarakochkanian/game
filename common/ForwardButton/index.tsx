import Image from 'next/image';
import { forwardArrow, forwardBtnShape } from '../../public/summary';

import styles from './ForwardButton.module.scss';

const ForwardButton = ({ onForward }: { onForward: () => void }) => {
  return (
    <button onClick={onForward}>
      <Image
        src={forwardArrow}
        className={styles.forwardArrow}
        alt="forwardArrow"
        width={96}
        height={96}
        priority
      />

      <Image
        src={forwardBtnShape}
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
