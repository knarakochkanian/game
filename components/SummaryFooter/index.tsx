import Image from 'next/image';
import { useEffect, useRef } from 'react';
import FooterButton from '../../common/FooterButton';
import { START, startAttackTitle } from '../../constants';
import { summaryFooterForm, summaryFooterGradient } from '../../public/summary';
import styles from './SummaryFooter.module.scss';
import { useWebSocket } from '../../contexts/WebSocketContext';

const buttonInfo = (
  <p>
    После нажатия у Вас будет 15 секунд для отмены. По нажатию на кнопку отмены
    произойдет сброс и возврат к главному экрану.
  </p>
);

const SummaryFooter = ({ onClick }: { onClick: () => void }) => {
  const { socket } = useWebSocket()!;
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!socket) return;

    const handleSocketMessage = (event: MessageEvent) => {
      if (event.data === 'start pressed' && buttonRef.current) {
        buttonRef.current.click();
      }
    };

    socket.addEventListener('message', handleSocketMessage);

    return () => {
      socket.removeEventListener('message', handleSocketMessage);
    };
  }, [socket]);

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
        order={START}
        title={startAttackTitle}
        from="Summary"
        buttonInfo={buttonInfo}
        buttonRef={buttonRef}
      />
    </footer>
  );
};

export default SummaryFooter;
