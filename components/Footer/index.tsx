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
        width={1263}
        height={84.905}
        priority
      />

      <Image
        className={styles.opacityOfButton}
        src={opacityOfButton}
        alt="opacityOfButton"
        width={1482.5}
        height={196.5}
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
