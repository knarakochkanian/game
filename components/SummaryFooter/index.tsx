import Image from 'next/image';
import FooterButton from '../../common/FooterButton';
import { START, startAttackTitle } from '../../constants';
import { summaryFooterForm, summaryFooterGradient } from '../../public/summary';

import styles from './SummaryFooter.module.scss';

const buttonInfo = (
  <p>
    После нажатия у Вас будет 15 секунд для отмены. По нажатию на кнопку отмены
    произойдет сброс и возврат к главному экрану.
  </p>
);

const SummaryFooter = ({ onClick }: { onClick: () => void }) => {
  return (
    <footer className={styles.summaryFooter}>
      <Image
        className={styles.topOfBotton}
        src={summaryFooterForm}
        alt="topOfBotton"
        width={1263}
        height={234.5}
        priority
      />

      <Image
        className={styles.opacityOfButton}
        src={summaryFooterGradient}
        alt="opacityOfButton"
        width={1483}
        height={363}
        priority
      />

      <FooterButton
        onClick={onClick}
        order={START}
        title={startAttackTitle}
        from="Summary"
        buttonInfo={buttonInfo}
      />
    </footer>
  );
};

export default SummaryFooter;
