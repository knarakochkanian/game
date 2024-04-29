import Image from 'next/image';
import {
  backArrow,
  backBtnShape,
  forwardArrow,
  forwardBtnShape,
} from '../../public/summary';

import styles from './BackAndForwardBtns.module.scss';

interface IBackAndForwardBtnsProps {
  onBack: () => void;
  onForward: () => void;
}

const BackAndForwardBtns = ({
  onBack,
  onForward,
}: IBackAndForwardBtnsProps) => {
  return (
    <>
      <button onClick={onBack}>
        <Image
          src={backArrow}
          className={styles.backArrow}
          alt="backArrow"
          width={96}
          height={96}
          priority
        />
        <Image
          src={backBtnShape}
          className={styles.backBtnShape}
          alt="backBtnShape"
          width={163}
          height={703}
          priority
        />
      </button>

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
    </>
  );
};

export default BackAndForwardBtns;
