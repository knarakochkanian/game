import Image from 'next/image';
import { useEffect, useRef } from 'react';
import FooterButton from '../../common/FooterButton';
import { START, startAttackTitle } from '../../constants';
import { summaryFooterForm, summaryFooterGradient } from '../../public/summary';
import styles from './SummaryFooter.module.scss';
import { useDeviceConnection } from '../../contexts/WebSocketContext';

const buttonInfo = (
  <p>
    После нажатия у Вас будет 15 секунд для отмены. По нажатию на кнопку отмены
    произойдет сброс и возврат к главному экрану.
  </p>
);

const SummaryFooter = ({ onClick }: { onClick: () => void }) => {
  const { lastMessage, send } = useDeviceConnection()!;
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    console.log("debug.lastMessage", lastMessage?.data)
    if (lastMessage?.data === 'start pressed' && buttonRef.current) {
      buttonRef.current.click();
    }
  }, [lastMessage]);

  return (
    <footer className={styles.summaryFooter}>
      <Image
        className={styles.topOfBotton}
        src={summaryFooterForm}
        alt="topOfBotton"
        width={595}
        height={110}
        priority
      />

      <Image
        className={styles.opacityOfButton}
        src={summaryFooterGradient}
        alt="opacityOfButton"
        width={698}
        height={171}
        priority
      />

      <FooterButton
        onClick={onClick}
        order={START}
        title={startAttackTitle}
        from="Summary"
        buttonInfo={buttonInfo}
        buttonRef={buttonRef}
        sx={{ pointerEvents: 'none' }}
      />
    </footer>
  );
};

export default SummaryFooter;
