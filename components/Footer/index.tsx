import Image from 'next/image';
import { opacityOfButton, topOfBotton } from '../../public/count-down';
import FooterButton from '../../common/FooterButton';
import { CANCEL, cancelAttackTitle } from '../../constants';

import styles from './Footer.module.scss';

const Footer = ({ cancelCountdown }: { cancelCountdown: () => void }) => {
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
