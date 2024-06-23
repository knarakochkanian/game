import Image from 'next/image';
import { backArrow, backBtnShape } from '../../public/summary';

import styles from './BackButton.module.scss';

const BackButton = ({ onBack }: { onBack: () => void }) => {
  return (
    <button onClick={onBack} className={styles.onBackBtn}>
      <Image
        src={backArrow}
        className={styles.backArrow}
        alt="backArrow"
        width={45}
        height={45}
        priority
      />
      <Image
        src={backBtnShape}
        className={styles.backBtnShape}
        alt="backBtnShape"
        width={77}
        height={331}
        priority
      />
      <span>НАЗАД</span>
    </button>
  );
};

export default BackButton;
