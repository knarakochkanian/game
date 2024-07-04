import Image from 'next/image';
import { opacityOfButton, topOfBotton } from '../../public/count-down';
import FooterButton from '../../common/FooterButton';
import { CANCEL, cancelAttackTitle } from '../../constants';
import styles from './Footer.module.scss';

interface FooterProps {
  cancelCountdown: () => void;
}

const Footer: React.FC<FooterProps> = ({ cancelCountdown }) => {
  return (
    <footer className={styles.footer}>
      <Image
        className={styles.topOfBotton}
        src={topOfBotton}
        alt="topOfBotton"
        width={595}
        height={40}
        priority
      />

      <Image
        className={styles.opacityOfButton}
        src={opacityOfButton}
        alt="opacityOfButton"
        width={698}
        height={92}
        priority
      />

      <FooterButton
        onClick={cancelCountdown}
        order={CANCEL}
        title={cancelAttackTitle}
      />
    </footer>
  );
};

export default Footer;
