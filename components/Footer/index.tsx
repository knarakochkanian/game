import Image from 'next/image';
import { topOfBotton } from '../../public/count-down';

import styles from './Footer.module.scss';

const Footer = ({ cancelCountdown }: { cancelCountdown: () => void }) => {
  return (
    <footer className={styles.footer}>
      <Image
        className={styles.topOfBotton}
        src={topOfBotton}
        alt="topOfBotton"
        width={1263}
        height={84.905}
        priority
      />

      <div className={styles.buttonContainer}>
        <button className={styles.cancelButton} onClick={cancelCountdown}>
          <h3>
            Для отмены атаки нажмите кнопку
            <span> “ОТМЕНА</span>
          </h3>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
